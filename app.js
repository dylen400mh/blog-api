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

app.use((err, req, res, next) => {
  if (err.status === 403) {
    return res.status(403).json({ error: err.message });
  }
  next(err); 
});

app.listen(3001, () => console.log("Listening on port 3001"));
