import express from "express";
import { LoginUser, SignupUser } from "../controllers/userController.js";
import { uploadImage, getImage } from "../controllers/imageController.js";
import { upload } from "../utils/upload.js";
import {
  deletePost,
  getAllPosts,
  getPostDetails,
  updatePost,
  uploadPost,
} from "../controllers/postController.js";
import { authenticateToken } from "../controllers/jwt-controller.js";
import {
  deleteComment,
  getCommments,
  newComment,
} from "../controllers/comment-controller.js";

const router = express.Router();

router.post("/signup", SignupUser);
router.post("/login", LoginUser);

///
router.post("/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);
///

router.post("/postupload", authenticateToken, uploadPost);
router.get("/getallpost", authenticateToken, getAllPosts);
router.get("/getpostdetails/:id", authenticateToken, getPostDetails);
router.put("/updatepost/:id", authenticateToken, updatePost);
router.delete("/deletepost/:id", authenticateToken, deletePost);
router.post("/comment/new", authenticateToken, newComment);
router.get("/getcomments/:id", authenticateToken, getCommments);
router.delete("/deletecomment/:id", authenticateToken, deleteComment);

export default router;
