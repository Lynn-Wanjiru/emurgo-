// models/register.js
import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true, // Ensure no extra spaces
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,

  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
  
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

// Check if the password and confirmPassword  match 
registerSchema.pre("save", function (next) {
  if (this.password !== this.confirmPassword) {
    return next(new Error("Password does not match"));
  }
  next();
});

const register =
  mongoose.models.register || mongoose.model("register", registerSchema);

export default register;
