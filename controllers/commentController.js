const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passport = require("passport");
const adminStrategy = require("../strategies/adminStrategy");
passport.use(adminStrategy);

exports.getPostComments = async (req, res, next) => {
  const id = parseInt(req.params.id, 10);
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
      });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: id,
      },
    });

    return res.status(200).json({ comments });
  } catch (err) {
    return next(err);
  }
};

exports.createPostComment = async (req, res, next) => {
  const postId = parseInt(req.params.id, 10);
  const user = req.user;

  try {
    const comment = await prisma.comment.create({
      data: {
        postId: postId,
        userId: user.id,
        content: req.body.content,
      },
    });

    return res.status(201).json({ message: "Comment created", comment });
  } catch (err) {
    return next(err);
  }
};
