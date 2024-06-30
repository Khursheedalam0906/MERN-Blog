import Post from "../models/postSchema.js";

export const uploadPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    return res.status(200).json({ message: "Post save successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getAllPosts = async (req, res) => {
  const { category } = req.query;
  try {
    if (category) {
      let posts = await Post.find({ categories: category });
      return res.status(200).json(posts);
    } else {
      let posts = await Post.find();
      return res.status(200).json(posts);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPostDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const getDetails = await Post.findById(id);
    return res.status(200).json(getDetails);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      await Post.findByIdAndUpdate(id, data);
      return res.status(200).json({ message: "Post update successfully" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      await Post.findByIdAndDelete(id);
      return res.status(200).json({ message: "Post deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
