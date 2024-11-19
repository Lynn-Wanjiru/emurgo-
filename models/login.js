// models/login.js
import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate emails in the database
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const login = mongoose.models.login || mongoose.model("login", loginSchema);

export default login;
