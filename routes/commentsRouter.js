const { Router } = require("express");

const commentsRouter = Router();

commentsRouter.get("/posts/:id/comments");
commentsRouter.post("/posts/:id/comments");
commentsRouter.put("/comments/:id");
commentsRouter.delete("/comments/:id");

module.exports = commentsRouter;
