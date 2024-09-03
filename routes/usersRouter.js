const { Router } = require("express");
const userController = require("../controllers/userController");
const usersRouter = Router();

usersRouter.post("/register", userController.registerUser);
usersRouter.post("/login", userController.loginUser);
usersRouter.post("/logout", userController.logoutUser);
usersRouter.get("/profile");
usersRouter.put("/profile");
usersRouter.delete("/profile");

module.exports = usersRouter;
