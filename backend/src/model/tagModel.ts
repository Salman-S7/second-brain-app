import { Model, Schema } from "mongoose";

const tagSchema = new Schema({
  title: { type: String, required: true, unique: true },
});

const Tag = new Model("Tag", tagSchema);

export default Tag;
