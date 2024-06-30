import { response } from "express";
import Comment from "../models/commentSchema.js";

export const newComment = async (req, res) => {
  const { comments } = req.body;
  try {
    if (comments.length > 0) {
      const comment = new Comment(req.body);
      await comment.save();
      return res.status(201).json({ message: "Comment send successfully" });
    }
    return res.status(200).json({ message: "Please write comment" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getCommments = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const comments = await Comment.find({ postId: id });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const commet = await Comment.findById(id);
    if (!commet) {
      return res.status(404).json({ message: "Comment not found" });
    } else {
      await Comment.findByIdAndDelete(id);
      return res.status(200).json({ message: "Post deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
