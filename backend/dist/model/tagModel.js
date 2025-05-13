"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tagSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
});
const Tag = new mongoose_1.Model("Tag", tagSchema);
exports.default = Tag;
