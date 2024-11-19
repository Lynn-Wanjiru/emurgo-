import Profile from "../models/profile.js";

// Create a new profile
export const createProfile = async (req, res) => {
  try {
    const { profilePhoto, userName, email, phoneNumber, address, town } =
      req.body;
    const newProfile = new Profile({
      profilePhoto,
      userName,
      email,
      phoneNumber,
      address,
      town,
    });
    await newProfile.save();
    res
      .status(201)
      .json({ message: "Profile created successfully", profile: newProfile });
  } catch (error) {
    res.status(500).json({ message: "Error creating profile", error });
  }
};

// Get all profiles
export const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res
      .status(200)
      .json({ message: "Profiles retrieved successfully", profiles });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profiles", error });
  }
};

// Get profile by ID
export const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res
      .status(200)
      .json({ message: "Profile retrieved successfully", profile });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};

// Update profile by ID
export const updateProfile = async (req, res) => {
  try {
    const { profilePhoto, userName, email, phoneNumber, address, town } =
      req.body;
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      { profilePhoto, userName, email, phoneNumber, address, town },
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res
      .status(200)
      .json({
        message: "Profile updated successfully",
        profile: updatedProfile,
      });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};
