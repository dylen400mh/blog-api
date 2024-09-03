const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    try {
      const user = await prisma.user.create({
        data: {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
      if (err.code === "P2002") {
        res.status(409).json({ error: "Username or email already exists" });
      }
      return next(err);
    }
  });
};

exports.loginUser = async (req, res, next) => {
  let { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    const token = jwt.sign(user, process.env.secret, { expiresIn: "1h" });
    return res.status(200).json({
      message: "Auth successful",
      token,
    });
  }

  return res.status(401).json({ message: "Auth failed" });
};

exports.logoutUser = (req, res, next) => {
  res.clearCookie("token", { httpOnly: true, secure: true }); // Clear the JWT cookie
  res.status(200).json({ message: "Logged out successfully" });
};
