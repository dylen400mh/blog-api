const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

exports.registerPost = async (req, res, next) => {
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

      res.status(401).json({ message: "User registered successfully", user });
    } catch (err) {
      if (err.code === "P2002") {
        res.status(409).json({ error: "Username or email already exists" });
      }
      return next(err);
    }
  });
};
