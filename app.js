const express = require("express");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");
const cors = require("cors");
const app = express();

corsOptions = {
  origin: process.env.FRONTEND_ORIGIN,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/", commentsRouter);

app.listen(3000, () => console.log("Listening on port 3000"));
