import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Token from "../models/tokenSchema.js";

dotenv.config();

export const SignupUser = async (req, res) => {
  try {
    const exist = await User.findOne({ username: req.body.username });
    if (exist) {
      return res.status(400).json({ message: "Username already exist" });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = {
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
      };
      const newUser = new User(user);
      await newUser.save();
      return res.status(201).json({ message: "Account created successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const LoginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).json({ message: "Username doesn't exist" });
  }
  try {
    let match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      //
      const accessToken = jwt.sign(
        user.toJSON(),
        process.env.ACCESS_SECRET_KEY,
        { expiresIn: "15m" }
      );
      //
      const refreshToken = jwt.sign(
        user.toJSON(),
        process.env.REFRESH_SECRET_KEY
      );
      //
      const newToken = new Token({ token: refreshToken });
      await newToken.save();

      return res.status(200).json({
        message: "Login Successfully",
        accessToken,
        refreshToken,
        name: user.name,
        username: user.username,
      });
      //
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
