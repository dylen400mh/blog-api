const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const adminStrategy = require("../strategies/adminStrategy");
passport.use(adminStrategy);

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany();
    return res.status(200).json({ posts });
  } catch (err) {
    return next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });

    // if post isn't published, authenticate
    if (!post.isPublished) {
      passport.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err || !user || user.username !== process.env.ADMIN_USER) {
          return res.status(403).json({
            message: "Forbidden: You are not allowed to view this post",
          });
        }

        return res.status(200).json({ post });
      });
    } else {
      return res.status(200).json({ post });
    }
  } catch (err) {
    return next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
      },
    });

    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    return next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: parseInt(req.params.id, 10),
      },
      data: {
        title: req.body.title,
        content: req.body.content,
        isPublished: req.body.isPublished,
      },
    });

    return res.status(200).json({ message: "Post updated", post });
  } catch (err) {
    return next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await prisma.post.delete({
      where: {
        id: parseInt(req.params.id, 10),
      },
    });

    return res.status(200).json({ message: "Post deleted", post });
  } catch (err) {
    return next(err);
  }
};

exports.getPublishedPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        isPublished: true,
      },
    });
    return res.status(200).json({ posts });
  } catch (err) {
    return next(err);
  }
};
