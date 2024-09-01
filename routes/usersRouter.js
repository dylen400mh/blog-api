const { Router } = require("express");
const userController = require("../controllers/userController");
const usersRouter = Router();

usersRouter.post("/register", userController.registerPost);
usersRouter.post("/login", userController.loginPost);
usersRouter.post("/logout", userController.logoutPost);
usersRouter.get("/profile");
usersRouter.put("/profile");
usersRouter.delete("/profile");

module.exports = usersRouter;
