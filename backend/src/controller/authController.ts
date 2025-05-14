import { Request, Response } from "express";
import User from "../model/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  //   TODO : to add zod validations

  if (!userName || !password) {
    res.status(499).json({ message: "All fields are required" });
    return;
  }

  try {
    const user = await User.findOne({ userName });

    if (user) {
      res.status(403).json({ message: "User already exists" });
      return;
    }

    // let's hash password here using bcrypt

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ userName, password: hashedPassword });

    const savedUser = await newUser.save();

    if (savedUser) {
      const jwtToken = jwt.sign(
        { userId: savedUser._id },
        process.env.JWT_SECRET || "JWTS3CR3T",
        { expiresIn: "1h" }
      );
      res.status(201).json({ message: "Sugnup succesfully", toket: jwtToken });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Interval server error" });
    console.log(error);
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    // 499 status code for required all fields
    res.status(499).json({ message: "All fields are required" });
    return;
  }

  try {
    const user = await User.findOne({ userName });

    if (!user) {
      res.status(404).json({ message: "User not found/Invalid credentials" });
      return;
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(404).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "JWTS3CR3T",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successfull", token });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
