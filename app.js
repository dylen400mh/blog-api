const express = require("express");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/", commentsRouter);

// Handling emails from portfolio site
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.use("/api/send-email", (req, res, next) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: "New Message from Portfolio Site",
    text: `${message}\n\n${name}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error sending message, please try again!" });
    }
    return res.status(200).json({ message: "Message sent, thanks!" });
  });
});

app.listen(3000, () => console.log("Listening on port 3000"));
