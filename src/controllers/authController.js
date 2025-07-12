 const { hashPassword, comparePassword } = require("../helper/hashPassword");
const { EncodeToken } = require("../helper/tokenHelper");
const galaryModel = require("../models/galaryModel");
const UserModel = require("../models/UserModel");
const path = require('path');
const fs = require('fs');
const nodemailer = require("nodemailer");
const mongoose = require('mongoose');

const read = async (req, res) => {
  const users = await UserModel.find({});
  res.status(200).json({ status: "success", data: users });
};
const reads = async (req, res) => {
 
  res.status(200).json({ status: "success route"});
};


const user = async (req, res) => {
  try {
    const { id } = req.params;
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
    const { name, email, password,blood, phone, profession,facebook, linkedin,district} = req.body;
    const image = req.file ? req.file.filename : null;

    const isExist = await UserModel.findOne({ email });
    if (isExist) {
      return res.status(400).json({ status: "error", message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const user = new UserModel({
      image,
      name,
      email,
      password: hashedPassword,
      phone,
      blood,
      profession,
      facebook,
      linkedin,
      district,
      role: 0
    });

    await user.save();

    res.status(201).json({ status: "success", data: user });
  } catch (e) {
    res.status(500).json({ status: "failed", error: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: "failed", message: "User not found" });
    }

    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ status: "failed", message: "Invalid password" });
    }

    const token = EncodeToken(user._id, user.name);
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "strict",
    });

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: "An internal error occurred", error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let updates = req.body;

    // Validate required fields
    const requiredFields = ["name", "email", "password", "batch", "session", "paper", "facebook", "linkedin", "phone", "profession", "institution"];
    for (let field of requiredFields) {
      if (!updates[field]) {
        return res.status(400).json({
          status: "error",
          message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`
        });
      }
    }

    if (req.file) {
      updates.image = req.file.filename;
    }

    if (updates.password) {
      updates.password = await hashPassword(updates.password);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const updatedUserWithImageUrl = {
      ...updatedUser.toObject(),
      image: updatedUser.image ? `/${updatedUser.image}` : null
    };

    res.status(200).json({ status: "success", data: updatedUserWithImageUrl });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const galary = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file ? req.file.filename : null;

    const existingImage = await galaryModel.findOne({ title });
    if (existingImage) {
      return res.status(400).json({ status: "failed", message: "Title is the same, please change the title" });
    }

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

const updateGalary = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const update = await galaryModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });
    res.status(201).json({ status: "success", result: update });
  } catch (e) {
    res.status(500).json({ status: "failed", error: e.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await galaryModel.findByIdAndDelete(id);
    res.status(200).json({ status: "success", result: result });
  } catch (e) {
    res.status(500).json({ status: "failed", error: e.message });
  }
};

const signleImage = async (req, res) => {
  try {
    const { id } = req.params;
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
    const image = await galaryModel.findOne({ _id: id });

    if (!image) {
      return res.status(404).json({ status: "failed", message: "Image not found" });
    }

    const filePath = path.join(__dirname, "..", "uploads", image.image);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ status: "failed", message: "File not found on the server" });
    }

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
  const { emails, sms } = req.body;

  try {
    if (!emails || !Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ message: "No recipients selected" });
    }
    if (!sms || typeof sms !== "string" || sms.trim() === "") {
      return res.status(400).json({ message: "Message is empty" });
    }

    const normalizedEmails = emails.map(email => email.trim().toLowerCase());
    const users = await UserModel.find({ email: { $in: normalizedEmails } });

    if (users.length === 0) {
      return res.status(400).json({ message: "Users not found" });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "md.sohelrana.ice@gmail.com", // ⚠️ WARNING: Move to .env
        pass: "fwka vzpe nipb gdaw ",         // ⚠️ WARNING: Move to .env
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    for (const user of users) {
      try {
        await transporter.sendMail({
          from: '"Your Name" <md.sohelrana.ice@gmail.com>',
          to: user.email,
          subject: "New SMS Notification",
          html: `
            <div>
              <h2>📩 New SMS</h2>
              <p>Hello <strong>${user.name}</strong>,<br />You have received a new SMS:</p>
              <p style="font-weight:bold;">${sms}</p>
              <p>This is an automated message. Please do not reply.</p>
            </div>
          `,
        });
      } catch (mailError) {
        console.error(`Failed to send email to ${user.email}:`, mailError);
      }
    }

    await UserModel.updateMany({ email: { $in: normalizedEmails } }, { sms });

    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (e) {
    res.status(500).json({ status: "failed", message: "Internal Server Error", error: e.message });
  }
};

const updateUserRole = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ status: "error", message: "Invalid user ID" });
  }

  const { role } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(id, { role }, { new: true, runValidators: true });
    if (!updatedUser) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }
    res.status(200).json({ status: "success", message: "User role updated", data: updatedUser });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

module.exports = {
  read,
  register,
  user,
  updateUser,
  login,
  galary,
  updateGalary,
  deleteItem,
  signleImage,
  downloadImage,
  sendEmail,
  updateUserRole,
  reads
};
