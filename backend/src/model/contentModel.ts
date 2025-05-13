import mongoose, { Model, Schema } from "mongoose";

const contentSchema = new Schema({
  link: String,
  type: String,
  title: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const Content = mongoose.model("Content", contentSchema);

export default Content;
