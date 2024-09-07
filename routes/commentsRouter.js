const { Router } = require("express");
const commentController = require("../controllers/commentController");
const commentsRouter = Router();
const userStrategy = require("../strategies/userStrategy");
const adminStrategy = require("../strategies/adminStrategy");
const passport = require("passport");
passport.use("jwt-admin", adminStrategy);
passport.use("jwt-user", userStrategy);

commentsRouter.get("/posts/:id/comments", commentController.getPostComments);
commentsRouter.post(
  "/posts/:id/comments",
  passport.authenticate("jwt-user", { session: false }),
  commentController.createPostComment
);
commentsRouter.put(
  "/comments/:id",
  passport.authenticate("jwt-user", { session: false }),
  commentController.updateComment
);
commentsRouter.delete(
  "/comments/:id",
  passport.authenticate("jwt-user", { session: false }),
  commentController.deleteComment
);

module.exports = commentsRouter;
