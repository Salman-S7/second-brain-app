import { Request, Response } from "express";
import User from "../model/userModel";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  console.log("Tryin to signup");
  const { userName, password } = req.body;

  if (!userName || !password) {
    res.status(411).json({ message: "All fields are required" });
    return;
  }

  const user = await User.findOne({ userName });

  if (user) {
    return res.status(403).json({ message: "User already exists" });
  }

  try {
    const savedUser = await User.save({userName, password})
    if(savedUser){
        const jwt
    }
  
  } catch (error) {
    res..status(500).json({message : "Interval server error"})
  }

};
