import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    min: 3,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 8,
    max: 30,
  },
});

const User = mongoose.model("user", userSchema);

export default User;
