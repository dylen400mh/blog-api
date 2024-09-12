const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

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
        res.status(409).json({ message: "Username or email already exists" });
      }
      return next(err);
    }
  });
};

exports.loginUser = async (req, res, next) => {
  let { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email: { equals: email, mode: "insensitive" },
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

  return res.status(401).json({ message: "Incorrect Credentials" });
};

exports.getUsers = async (req, res, next) => {
  const ids = req.query.ids;

  if (!ids) {
    return res.status(400).json({ message: "No user IDs provided" });
  }

  const userIds = ids.split(",").map((id) => parseInt(id, 10));

  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        username: true,
      },
    });

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users });
  } catch (err) {
    return next(err);
  }
};

exports.getCurrentUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token in headers" });
  }

  jwt.verify(token, process.env.secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token." });
    }

    const user = { id: decoded.id, username: decoded.username };
    return res.status(200).json({ user });
  });
};
