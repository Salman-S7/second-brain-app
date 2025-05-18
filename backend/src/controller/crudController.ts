import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Content from "../model/contentModel";
import Tag from "../model/tagModel";

export const addContent = async (req: AuthRequest, res: Response) => {
  const { type, link, title, tags } = req.body;

  const userId = req.userId;

  if (!type || !link || !title || !tags) {
    res.status(499).json({ message: "All fields are required" });
    return;
  }

  try {
    const existingTag = await Tag.findOne({ title: tags });

    if (!existingTag) {
      const newTag = new Tag({ title: tags });

      const savedTag = await newTag.save();

      const existingContent = await Content.findOne({
        link,
        userId,
      });

      if (existingContent) {
        res.status(403).json({ message: "Content already exists" });
        return;
      }

      const newContent = new Content({
        type,
        link,
        title,
        tags: savedTag,
        userId,
      });

      await newContent.save();

      res.status(201).json({ message: "Content saved succesfully" });

      return;
    }

    const newContent = new Content({
      type,
      link,
      title,
      tags: existingTag,
      userId,
    });

    const existingContent = await Content.findOne({
      type,
      link,
      title,
      tags: newContent,
      userId,
    });

    if (existingContent) {
      res.status(403).json({ message: "Content already exists" });
      return;
    }

    await newContent.save();

    res.status(201).json({ message: "Content saved succesfully" });
  } catch (error) {
    console.log("Error while saving content", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getContent = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  try {
    const data = await Content.find({ userId });

    res.status(200).json({ content: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteContent = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  const contentId = req.params.id;

  try {
    const deletedContent = await Content.findByIdAndDelete({ _id: contentId });

    if (!deleteContent) {
      res.status(404).json({ message: "Content with given id does'nt exists" });
    }

    res.status(200).json({ message: "Content deleted" });
  } catch (error) {
    console.log("Something went wrong in deleteContent");
    res.status(500).json({ message: "Internal server error" });
  }
};
