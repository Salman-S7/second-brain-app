"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const userSchema = new mongoose_2.Schema({
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
const User = new mongoose_1.Model("User", userSchema);
exports.default = User;
