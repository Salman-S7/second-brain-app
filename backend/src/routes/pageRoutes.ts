import { Router } from "express";
import { login, signup } from "../controller/authController";
import {
  addContent,
  deleteContent,
  getContent,
} from "../controller/crudController";
import { authMiddleWare } from "../middleware/authMiddleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/content", authMiddleWare, addContent);
router.get("/content", authMiddleWare, getContent);
router.delete("/content/:id", authMiddleWare, deleteContent);

export default router;
