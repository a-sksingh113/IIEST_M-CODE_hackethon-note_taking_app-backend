const User = require("../models/userModel");
const JWT = require("jsonwebtoken");
const {sendForgetPasswordURL,sendWellcomeEmail} = require('../middleware/emailSendMiddleware')
const handleUserSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    if (!token) {
      throw new Error("Token generation failed");
    }
    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("error signin ", error);
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }
};


const handleUserSignup = async (req, res) => {
  const { fullName, email, password } = req.body;
  const profileImageURL = req.file ? req.file.path : '/uploads/default-1.png';
  try {
    if (!fullName || !email || !password || !profileImageURL) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exits" });
    }
    const newUser = await User.create({
      fullName,
      email,
      password,
      profileImageURL,
    });
    return res
      .status(201)
      .json({ message: "User created successfuly", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};



const handleUserlogout = (req, res) => {
  res.clearCookie("token"); 
  res.status(200).json({ message: "Logged out successfully" });
};

const handleUpdateUser = async (req, res) => {
  const { userId } = req.params;
  const { fullName, year } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Update fullName and year
    user.fullName = fullName || user.fullName;
    user.year = year || user.year;

    // Update profile photo if provided
    if (req.file) {
      user.profileImageURL = req.file.path;
    }

    await user.save();
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};


const handleForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate Reset Token
    const resetToken = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send Reset Email
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendForgetPasswordURL(user.email,resetURL)

    return res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error in forgot password: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const handleResetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = JWT.verify(resetToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = newPassword;
    await user.save();
    await sendWellcomeEmail(user.email,user.fullName)

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password: ", error);
    return res.status(500).json({ message: "Server error" });
  }
};


module.exports = { handleUserSignup, handleUserSignin,handleUserlogout,handleUpdateUser,handleForgotPassword ,handleResetPassword};
