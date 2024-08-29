const { Router } = require("express");

const usersRouter = Router();

usersRouter.post("/register");
usersRouter.post("/login");
usersRouter.post("/logout");
usersRouter.get("/profile");
usersRouter.put("/profile");
usersRouter.delete("/profile");

module.exports = usersRouter;
