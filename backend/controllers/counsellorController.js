import Counsellor from "../models/Counsellor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
// Get all counsellors (you already have this)
export const getAllCounsellors = async (req, res) => {
  try {
    const counsellors = await Counsellor.find().select(
      "name specialization phone email availability isActive"
    );
    res.json(counsellors);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch counsellors" });
  }
};

// Create a new counsellor
export const createCounsellor = async (req, res) => {
  try {
    const { name, specialization, phone, email, availability, isActive } = req.body;

    // Create new counsellor document
    const newCounsellor = new Counsellor({
      name,
      specialization,
      phone,
      email,
      availability,
      isActive,
    });

    await newCounsellor.save();

    res.status(201).json({
      message: "Counsellor created successfully",
      counsellor: newCounsellor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create counsellor" });
  }
};
export const registerCounsellor = async (req, res) => {
    try {
      const { name, username, password, specialization, phone, email, availability } = req.body;
  
      // Check if username/email already exists
      const existing = await Counsellor.findOne({ username });
      if (existing) return res.status(400).json({ message: "Username already exists" });
  
      const newCounsellor = new Counsellor({
        name,
        username,
        password,
        specialization,
        phone,
        email,
        availability,
        isActive: true,
      });
  
      await newCounsellor.save();
  
      res.status(201).json({ message: "Counsellor registered successfully", counsellor: newCounsellor });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Registration failed" });
    }
  };




export const loginCounsellor = async (req, res) => {
  try {
    const { username, password } = req.body;

    const counsellor = await Counsellor.findOne({ username });
    if (!counsellor) return res.status(400).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, counsellor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

    // Create JWT token
    const token = jwt.sign(
      { id: counsellor._id, username: counsellor.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      counsellor: {
        id: counsellor._id,
        name: counsellor.name,
        username: counsellor.username,
        email: counsellor.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};
