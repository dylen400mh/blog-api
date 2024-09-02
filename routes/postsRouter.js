const { Router } = require("express");
const postController = require("../controllers/postController");
const adminStrategy = require("../strategies/adminStrategy");
const passport = require("passport");
passport.use(adminStrategy);

const postsRouter = Router();

postsRouter.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.getPosts
);
postsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);
postsRouter.get("/published", postController.getPublishedPosts);
postsRouter.get("/:id", postController.getPostById);
postsRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.updatePost
);
postsRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  postController.deletePost
);

module.exports = postsRouter;
