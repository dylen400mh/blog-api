const { Router } = require("express");
const userController = require("../controllers/userController");
const usersRouter = Router();
const userStrategy = require("../strategies/userStrategy");
const adminStrategy = require("../strategies/adminStrategy");
const passport = require("passport");
passport.use(adminStrategy, userStrategy);

usersRouter.post("/register", userController.registerUser);
usersRouter.post("/login", userController.loginUser);
usersRouter.post("/logout", userController.logoutUser);
usersRouter.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  userController.getUsers
);
usersRouter.get("/profile");
usersRouter.put("/profile");
usersRouter.delete("/profile");

module.exports = usersRouter;
