import express from "express";
import {
  createProfile,
  getProfiles,
  getProfileByEmail,
  updateProfile,
} from "../controllers/profileController.js";

const router = express.Router();

// Create a new profile
router.post("/", createProfile);

// Get all profiles
router.get("/", getProfiles);

// Get profile by email
router.get("/email/:email", getProfileByEmail); 

// Update profile by email
router.put("/email/:email", updateProfile); 

export default router;
