import { Model } from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = new Model("User", userSchema);

export default User;
