const { Router } = require("express");

const postsRouter = Router();

postsRouter.get("/");
postsRouter.get("/:id");
postsRouter.post("/");
postsRouter.put("/:id");
postsRouter.delete("/:id");
postsRouter.get("/published");



module.exports = postsRouter;
