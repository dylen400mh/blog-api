const { Router } = require("express");
const userController = require("../controllers/userController");
const usersRouter = Router();
const userStrategy = require("../strategies/userStrategy");
const adminStrategy = require("../strategies/adminStrategy");
const passport = require("passport");
passport.use("jwt-admin", adminStrategy);
passport.use("jwt-user", userStrategy);

usersRouter.post("/register", userController.registerUser);
usersRouter.post("/login", userController.loginUser);
usersRouter.get("/users", userController.getUsers);
usersRouter.get("/current-user", userController.getCurrentUser);
usersRouter.get("/profile");
usersRouter.put("/profile");
usersRouter.delete("/profile");

module.exports = usersRouter;
