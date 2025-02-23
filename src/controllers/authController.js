const { hashPassword, comparePassword } = require("../helper/hashPassword");
const { EncodeToken } = require("../helper/tokenHelper");
const galaryModel = require("../models/galaryModel");
const UserModel = require("../models/UserModel");
const path = require('path'); // Add this import
const fs = require('fs');
const nodemailer = require("nodemailer");

const read =async(req, res) => {
  const users=await UserModel.find({})
  res.status(200).json({ status: "success", data:users});
};
const user = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch user by ID
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    res.status(500).json({ status: "failed", error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, batch, session, phone, profession, institution, county, facebook, linkedin, paper, district, bio } = req.body;
    const image = req.file ? req.file.filename : null;

    // Check if user already exists
    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      return res.status(400).json({ status: "error", message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const user = new UserModel({
      image,
      name,
      email,
      password: hashedPassword, // Use the hashed password
      batch,
      session,
      phone,
      profession,
      institution,
      county,
      facebook,
      linkedin,
      paper,
      district,
      bio,role:0
    });

    // Save user
    await user.save();

    res.status(201).json({ status: "success", data: user });
  } catch (e) {
    res.status(500).json({ status: "failed", error: e.message });
  }
}; 
 
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ status: "failed", message: "User not found" });
    }

    // Compare passwords
    const isPasswordCorrect = await comparePassword(password, user.password);
    console.log("Password Match:", isPasswordCorrect);
    if (!isPasswordCorrect) {
      console.log("Invalid password");
      return res.status(401).json({ status: "failed", message: "Invalid password" });
    }

    // Generate JWT
    const token = EncodeToken(user._id, user.name);
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hour
      sameSite: "strict",
    });

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      data: user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ status: "failed", message: "An internal error occurred", error: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let updates = req.body;  
    let image = req.file ? req.file.filename : null;
    updates.image = image;

    // Define required fields
    const requiredFields = ["name", "email", "password", "batch", "session","paper","facebook","linkedin", "phone", "profession", "institution"];

    for (let field of requiredFields) {
      if (!updates[field]) {
        return res.status(400).json({
          status: "error",
          message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`
        });
      }
    }

    // Handle file upload
    if (req.file) {
      const imagePath = `${req.file.filename}`;
      updates.image = imagePath;
    } else {
      console.log('No image uploaded.');
    }

    // Log the updates object
    console.log('Updates to save:', updates);

    // Perform the database update
    const updatedUser = await UserModel.findByIdAndUpdate(id, updates, { 
      new: true, 
      runValidators: true 
    });

    if (!updatedUser) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    // Add image URL to response
    const updatedUserWithImageUrl = {
      ...updatedUser.toObject(),
      image: updatedUser.image ? `/${updatedUser.image}` : null
    };

    res.status(200).json({ status: "success", data: updatedUserWithImageUrl });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ status: "error", message: error.message || "An unexpected error occurred" });
  }
};
//garaly image and title

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

const updateGalary=async(req,res)=>{

 try{
  const {id}=req.params;
  const updates=req.body;
  const update=await galaryModel.findByIdAndUpdate(id,updates, { 
    new: true, // Return updated document
    runValidators: true // Ensure data is validated
  });
  res.status(201).json({ status: "success", result: update });
 } catch (e) {
  res.status(500).json({ status: "failed", error: e.message });
}

}
const deleteItem=async(req,res)=>{
 try{
  const {id}=req.params;
  const result=await galaryModel.findByIdAndDelete(id)
  res.status(201).json({ status: "success", result: result });

 }catch (e) {
  res.status(500).json({ status: "failed", error: e.message });
}
}

const signleImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Ensure _id is used to query MongoDB
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

    // Find image in the database by ID
    const image = await galaryModel.findOne({ _id: id });

    if (!image) {
      return res.status(404).json({ status: "failed", message: "Image not found" });
    }

    // Construct the correct file path (from the root directory)
    const filePath = path.join('uploads', image.image);

    console.log("Resolved file path:", filePath); // Log for debugging

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ status: "failed", message: "File not found on the server" });
    }

    // Send the file for download
    res.download(filePath, (err) => {
      if (err) {
        return res.status(500).json({ status: "failed", message: "Error downloading the file" });
      }
    });
  } catch (e) {
    res.status(500).json({ status: "failed", error: e.message });
  }
};

const sendEmail = async (req, res) => {
  const { email, sms } = req.body;

  try {
    // Log the received data for debugging
    console.log("Email received:", email);
    console.log("SMS received:", sms);

    // Trim and process the email
    const emailTrimmed = email.trim().toLowerCase();  // Normalize email
    let user = await UserModel.findOne({ email: emailTrimmed });

    if (!user) {
      console.log(`No user found with email: ${emailTrimmed}`);
      return res.status(400).json({ message: "User not found" });
    }

    // Set up Nodemailer transporter
    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,  // false means TLS
      auth: {
        user: "md.sohelrana.ice@gmail.com",  // Use your Gmail address here
        pass: "qwhu jmwb wqzh gnbf"  // Use your Gmail app password here
      }
    });

    // Send OTP email
    const info = await transporter.sendMail({
      from: "md.sohelrana.ice@gmail.com",
      to: emailTrimmed,
      subject: "Verify Your Email",
      html: ` <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New SMS</title>
      </head>
      <body>
        <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="text-align: center; color: #333;">📩 New SMS</h2>
          <p style="font-size: 16px; color: #555; text-align: center;">
            Hello <strong>${user.name}</strong>,<br>
            You have received a new SMS:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <p style="font-size: 18px; font-weight: bold; color: #007bff; background: #e8f0fe; padding: 15px; border-radius: 5px; display: inline-block;">
              <b><i>${sms}</i></b>
            </p>
          </div>
          <p style="font-size: 14px; color: #777; text-align: center;">
            This is an automated message. Please do not reply.
          </p>
        </div>
      </body>
      </html>`
    });

    // Update SMS in the database for the user
    const updatedUser = await UserModel.updateOne({ email: emailTrimmed }, { sms: sms });
    console.log("Updated SMS in database:", updatedUser); // Log update

    // Send success response
    res.status(200).json({ message: "Your sms has been sent successfully" });
  } catch (e) {
    console.error("Error occurred:", e); // Log full error
    res.status(500).json({ status: "failed", message: "Internal Server Error", error: e.message });
  }
};

module.exports = {
  read,
  register,user,updateUser,login,galary,updateGalary,deleteItem,signleImage,downloadImage,sendEmail
};
