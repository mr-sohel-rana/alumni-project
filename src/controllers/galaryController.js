const mongoose = require('mongoose'); // Import mongoose
const galaryModel = require("../models/galaryModel");
const path = require('path');
const fs = require('fs');

const galaryImage=async(req,res)=>{
  const result=await galaryModel.find({})
  res.status(200).json({status:"success",result:result})
}

// Add a new image with a title
const galary = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file ? req.file.filename : null;

    // Check if an image with the same title already exists
    const existingImage = await galaryModel.findOne({ title });
    if (existingImage) {
      return res.status(400).json({ status: "failed", message: "Title is the same, please change the title" });
    }

    // Save the new image
    const newImage = new galaryModel({
      image,
      title,
    });

    await newImage.save();
    res.status(201).json({ status: "success", result: newImage });
  } catch (e) {
    res.status(500).json({ status: "failed", error: e.message });
  }
};

// Update an existing image
const updateGalary = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "failed", message: "Invalid image ID" });
    }

    const update = await galaryModel.findByIdAndUpdate(id, updates, {
      new: true, // Return updated document
      runValidators: true, // Ensure data is validated
    });

    if (!update) {
      return res.status(404).json({ status: "failed", message: "Image not found" });
    }

    res.status(201).json({ status: "success", result: update });
  } catch (e) {
    res.status(500).json({ status: "failed", error: e.message });
  }
};

// Delete an image
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "failed", message: "Invalid image ID" });
    }

    const result = await galaryModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ status: "failed", message: "Image not found" });
    }

    res.status(201).json({ status: "success", result: result });
  } catch (e) {
    res.status(500).json({ status: "failed", error: e.message });
  }
};

// Get a single image by ID
const signleImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "failed", message: "Invalid image ID" });
    }

    const singleImage = await galaryModel.findOne({ _id: id });

    if (!singleImage) {
      return res.status(404).json({ status: "failed", message: "Image not found" });
    }

    res.status(200).json({ status: "success", result: singleImage });
  } catch (e) {
    res.status(500).json({ status: "failed", error: e.message });
  }
};

const downloadImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: "failed", message: "Invalid image ID" });
    }

    // Find image in the database by ID
    const image = await galaryModel.findById(id);
    if (!image) {
      return res.status(404).json({ status: "failed", message: "Image not found" });
    }

    // Construct the file path
    const filePath = path.join('uploads', image.image);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ status: "failed", message: "File not found on the server" });
    }

    // Set the appropriate headers for downloading the image
    res.setHeader('Content-Disposition', `attachment; filename=${image.image}`);
    res.setHeader('Content-Type', 'image/png'); // This ensures the browser knows it's a PNG file

    // Stream the file content
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

    // Alternatively, you can use res.download() but ensure correct handling
    // res.download(filePath, image.image);
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ status: "failed", error: e.message });
  }
};
// Export all functions
module.exports = {
  galary,
  updateGalary,
  deleteItem,
  signleImage,
  downloadImage,galaryImage
};