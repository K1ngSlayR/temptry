const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");

const signup = async (req, res) => {
  try {
    const { name, email, password, gamertag, country } = req.body;
    const existingUser = await userModel.findOne({ email });
    // found an user with this "email"
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, you can login",
        success: false,
      });
    }

    const newUser = new userModel({ name, email, password, gamertag, country });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201).json({
      message: "Signup successful!",
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Signup failed",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    const errorMsg = "Your email or password is incorrect!";
    if (!existingUser) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const isPassEqual = await bcrypt.compare(password, existingUser.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    const jwtToken = jwt.sign(
      { email: existingUser.email, _id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login Successful!",
      success: true,
      jwtToken,
      email,
      name: existingUser.name,
      gamertag: existingUser.gamertag,
      country: existingUser.country,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login,
};
