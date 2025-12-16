import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../utils/token.js';


export const signUp = async (req, res) => {
  console.log("hello");
  
  try {
    const { username, email, password, profileImage } = req.body;

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email and password are required." });
    }

    // Check if user already exists (email OR username)
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "User with that email already exists." });
      }
      return res.status(400).json({ message: "Username is already taken." });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      profileImage
    });

    await newUser.save();




    return res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error during registration." });
  }
};


export const logIn = async (req, res) => {
  try {
    const { loginId, password} = req.body;

    // Basic validation
    if (!loginId || !password) {
      return res.status(400).json({ message: "Username, email and password are required." });
    }

    const user = await User.findOne({
      $or: [{ email:loginId }, { username:loginId }]
    });

    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }
const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

user.refreshToken = refreshToken;
await user.save();


    return res.status(200).json({
      message: "User Logged In Successfully",
      user: {
        id: user._id,   
        username: user.username,
        email: user.email
      },
      refreshToken,
      accessToken
    });


  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error during registration." });
  }
};



export const refresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required." });
  }
  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.status(403).json({ message: "Invalid refresh token." });
  }

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token." });
    }
    const accessToken = generateAccessToken(user);
    return res.status(200).json({ accessToken });
  });
};


export const logOut = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is required." });
  }
  const user = await User.findOne({ refreshToken });
  if (!user) {
    return res.status(403).json({ message: "Invalid refresh token." });
  }
  user.refreshToken = null;
  await user.save();
  return res.status(200).json({ message: "User logged out successfully." });
};