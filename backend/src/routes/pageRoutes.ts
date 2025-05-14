import { Router } from "express";
import { login, signup } from "../controller/authController";
import { addContent } from "../controller/crudController";
import { authMiddleWare } from "../middleware/authMiddleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/content", authMiddleWare, addContent);

export default router;
