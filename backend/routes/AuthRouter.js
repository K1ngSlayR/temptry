const { signup, login } = require("../controllers/authController");
const userModel = require("../models/user.model");
const router = require("express").Router();
const {
  signupValidation,
  loginValidation,
} = require("../middlewares/validation");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

// // GET user by name
// router.get("/user/:name", async (req, res) => {
//   const { name } = req.params;
//   try {
//     const user = await userModel.findOne({ name });
//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }
//     return res.status(200).json({ success: true, user });
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ success: false, message: "Server error", error });
//   }
// });

module.exports = router;
