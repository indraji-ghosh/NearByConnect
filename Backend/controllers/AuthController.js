import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateToken } from '../utils/token.js';


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


const token = generateToken(newUser)



    return res.status(201).json({
      message: "User Registered Successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      },
      token
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
    const token = generateToken(user);

    return res.status(200).json({
      message: "User Logged In Successfully",
      user: {
        id: user._id,   
        username: user.username,
        email: user.email
      },
      token
    });


  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Server error during registration." });
  }
};
