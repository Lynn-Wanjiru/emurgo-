// controllers/imageController.js
import Image from "../models/image.js";

// Upload a new image
export const uploadImage = async (req, res) => {
  try {
    const { photo } = req.body;
    const newImage = new Image({ photo });
    await newImage.save();
    res.status(201).json({
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error });
  }
};

// Get all images
export const getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json({
      message: "Images retrieved successfully",
      images,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching images", error });
  }
};

// Delete an image by ID
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await Image.findByIdAndDelete(id);
    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.status(200).json({
      message: "Image deleted successfully",
      image: deletedImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting image", error });
  }
};
