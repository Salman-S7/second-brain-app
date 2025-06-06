import mongoose, { Model, Schema } from "mongoose";

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const Link = mongoose.model("Link", linkSchema);

export default Link;
