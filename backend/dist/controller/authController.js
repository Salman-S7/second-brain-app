"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password } = req.body;
    if (!userName || !password) {
        res.status(411).json({ message: "All fields are required" });
        return;
    }
    try {
        const user = yield userModel_1.default.findOne({ userName });
        if (user) {
            res.status(403).json({ message: "User already exists" });
            return;
        }
        const newUser = new userModel_1.default({ userName, password });
        const savedUser = yield newUser.save({ userName, password });
        if (savedUser) {
            const jwtToken = jsonwebtoken_1.default.sign(savedUser._id, process.env.JWT_SECRET || "JWTS#CR#!");
            res.status(201).json({ message: "Sugnup succesfully", toket: jwtToken });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: "Interval server error" });
        return;
    }
});
exports.signup = signup;
