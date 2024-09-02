const { Router } = require("express");
const commentController = require("../controllers/commentController");
const commentsRouter = Router();
const userStrategy = require("../strategies/userStrategy");
const adminStrategy = require("../strategies/adminStrategy");
const passport = require("passport");
passport.use(adminStrategy, userStrategy);

commentsRouter.get("/posts/:id/comments", commentController.getPostComments);
commentsRouter.post(
  "/posts/:id/comments",
  passport.authenticate("jwt", { session: false }),
  commentController.createPostComment
);
commentsRouter.put("/comments/:id");
commentsRouter.delete("/comments/:id");

module.exports = commentsRouter;
