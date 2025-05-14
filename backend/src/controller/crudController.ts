import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";

export const addContent = async (req: AuthRequest, res: Response) => {
  const { type, link, title, tags } = req.body;

  const userId = req.userId;

  if (!type || !link || !title || !tags) {
    res.status(499).json({ message: "All fields are required" });
    return;
  }
};
