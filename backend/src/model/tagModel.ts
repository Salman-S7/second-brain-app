import mongoose, { Model, mongo, Schema } from "mongoose";

const tagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

const Tag = mongoose.model("Tag", tagSchema);

export default Tag;
