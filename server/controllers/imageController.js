import grid from "gridfs-stream";
import mongoose from "mongoose";

const url = "mern-blog-api-ten.vercel.app";

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

////
export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(404).json({ message: "File not found" });
  }
  const imageUrl = `${url}/file/${req.file.filename}`;
  return res.status(200).json({ imageUrl });
};

////
export const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
