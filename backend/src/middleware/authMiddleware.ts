import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface AuthRequest extends Request {
  userId?: string | JwtPayload;
}

export const authMiddleWare = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      typeof req.headers.token === "string" ? req.headers.token : undefined;

    if (!token) {
      res.status(401).json({ message: "Not authorised" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "JWTS3CR3T"
    ) as {
      userId: Types.ObjectId;
    };
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({
      message: `Inavlid or expired token`,
    });
    return;
  }
};
