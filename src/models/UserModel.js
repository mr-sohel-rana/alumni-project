const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  batch: { type: String, required: true },
  session: { type: String, required: true },
  phone: { type: Number, required: true },
  profession: { type: String, required: true }, 
  institution: { type: String },
  county: { type: String },
  facebook: { type: String },
  linkedin: { type: String },  
  paper: { type: Number },
  district: { type: String, required: true },  
  bio: { type: String },
  image: { type: String },
  sms: { type: String ,default:0},
  role: { type: Number ,default:0}
});

module.exports = mongoose.model("Students", studentSchema);
