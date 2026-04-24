import {User} from "../model/user.js";   
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

// REGISTER
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: "user", // Ensure new users are assigned the 'user' role  
    });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role }, // ✅ don’t expose password
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: existingUser.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: existingUser.id, username: existingUser.username, email: existingUser.email, role: existingUser.role }, // ✅ include role in response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
