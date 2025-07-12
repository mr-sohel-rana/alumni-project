const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  profession: { type: String, required: true }, 
  facebook: { type: String },
  linkedin: { type: String },  
  district: { type: String, required: true },  
  blood: { type: String },
  image: { type: String },
  sms: { type: String ,default:0},
  role: { type: Number ,default:0}
});

module.exports = mongoose.model("Doners", studentSchema);
