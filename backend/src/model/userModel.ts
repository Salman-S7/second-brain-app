import mongoose, { Model, mongo } from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
