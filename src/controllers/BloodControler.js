 const Post = require("../models/BloodPostModel");

// Helper: Send server error
const handleError = (res, err) => {
  res.status(500).json({ status: "error", message: err.message });
};

// ───────────── CREATE POST
const createPost = async (req, res) => {
  try {
    const { problemname, blood, amount, date, place, phone1, phone2 } = req.body;

    if (!problemname || !blood || !amount || !date || !place || !phone1 || !phone2) {
      return res.status(400).json({ status: "fail", message: "All fields are required" });
    }

    const newPost = await Post.create({ problemname, blood, amount, date, place, phone1, phone2 });
    return res.status(201).json({ status: "success", data: newPost });
  } catch (err) {
    handleError(res, err);
  }
};

// ───────────── GET ALL POSTS
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data: posts });
  } catch (err) {
    handleError(res, err);
  }
};

// ───────────── GET ONE POST
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ status: "fail", message: "Post not found" });
    }
    res.status(200).json({ status: "success", data: post });
  } catch (err) {
    handleError(res, err);
  }
};

// ───────────── UPDATE POST
const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).json({ status: "fail", message: "Post not found" });
    }
    res.status(200).json({ status: "success", data: post });
  } catch (err) {
    handleError(res, err);
  }
};

// ───────────── DELETE POST
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ status: "fail", message: "Post not found" });
    }
    res.status(204).end(); // No Content
  } catch (err) {
    handleError(res, err);
  }
};

// ───────────── EXPORT ALL
module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
