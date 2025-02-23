const carocelModel = require("../models/caroselModel");
const fs = require("fs");
const path = require("path");

// Fetch all images
const allImage = async (req, res) => {
  try {
    const allImages = await carocelModel.find({});
    res.status(200).json({ status: "success", result: allImages });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

// Upload new carousel image
const carocel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: "failed", message: "No image uploaded" });
    }

    const image = req.file.filename;
    const result = await carocelModel.create({ image });

    res.status(200).json({ status: "success", result: result });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

// Update carousel image
const updateCarocelImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the image by ID
    const image = await carocelModel.findById(id);
    if (!image) {
      return res.status(404).json({ status: "failed", message: "Image not found" });
    }

    // Remove the old image file from the server
    const oldImagePath = path.join('uploads', image.image);
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    // Update with new image
    const newImage = req.file.filename;
    image.image = newImage;

    const updatedImage = await image.save();
    res.status(200).json({ status: "success", result: updatedImage });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

// Delete carousel image
const deleteCarocelImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the image by ID
    const image = await carocelModel.findById(id);
    if (!image) {
      return res.status(404).json({ status: "failed", message: "Image not found" });
    }

    // Delete the image from the database
    await carocelModel.findByIdAndDelete(id);

    // Remove the image file from the server
    const imagePath = path.join('uploads', image.image);
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    res.status(200).json({ status: "success", message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = { carocel, updateCarocelImage, deleteCarocelImage, allImage };
