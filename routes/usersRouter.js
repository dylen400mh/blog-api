const { Router } = require("express");
const userController = require("../controllers/userController");
const usersRouter = Router();

usersRouter.post("/register", userController.registerPost);
usersRouter.post("/login");
usersRouter.post("/logout");
usersRouter.get("/profile");
usersRouter.put("/profile");
usersRouter.delete("/profile");

module.exports = usersRouter;
