import Profile from "../models/profile.js";

// Create a new profile
export const createProfile = async (req, res) => {
  try {
    const { profilePhoto, userName, email, phoneNumber, address, town } =
      req.body;

    // Check if profile with the same email already exists
    const existingProfile = await Profile.findOne({ email });
    if (existingProfile) {
      return res
        .status(400)
        .json({ message: "Profile with this email already exists" });
    }

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

// Get profile by email
export const getProfileByEmail = async (req, res) => {
  try {
    const { email } = req.params; // Get email from URL params
    const profile = await Profile.findOne({ email }); // Find profile by email

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

// Update profile by email
export const updateProfile = async (req, res) => {
  try {
    const { profilePhoto, userName, email, phoneNumber, address, town } =
      req.body;

    // Check if the profile exists by email
    const profile = await Profile.findOne({ email });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Update profile with new data
    profile.profilePhoto = profilePhoto || profile.profilePhoto;
    profile.userName = userName || profile.userName;
    profile.phoneNumber = phoneNumber || profile.phoneNumber;
    profile.address = address || profile.address;
    profile.town = town || profile.town;

    await profile.save();
    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};
