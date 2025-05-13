import { Request, Response } from "express";
import User from "../model/userModel";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    res.status(411).json({ message: "All fields are required" });
    return;
  }

  try {
    const user = await User.findOne({ userName });

    if (user) {
      res.status(403).json({ message: "User already exists" });
      return;
    }

    const newUser = new User({ userName, password });

    const savedUser = await newUser.save({ userName, password });
    if (savedUser) {
      const jwtToken = jwt.sign(
        savedUser._id,
        process.env.JWT_SECRET || "JWTS#CR#!"
      );
      res.status(201).json({ message: "Sugnup succesfully", toket: jwtToken });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Interval server error" });
    return;
  }
};
