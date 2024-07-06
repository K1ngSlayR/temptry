const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT;

const AuthRouter = require("./routes/AuthRouter");
const bodyParser = require("body-parser");

// middleware
app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);

// connect database and start server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to the database!");
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("connection failed", error);
  });
// routes

app.get("/ping", (req, res) => {
  res.send("pong");
});
