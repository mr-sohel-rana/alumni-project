const mongoose = require("mongoose");

const BloodSchema = new mongoose.Schema({
  problemname: { type: String, required: true },
  blood: { type: String, required: true },
  amount: { type: String, required: true },
  date: { type: Number, required: true },
  place: { type: String, required: true }, 
  phone1: { type: String ,required: true },
  phone2: { type: String,required: true  },  
});

module.exports = mongoose.model("Posts", BloodSchema);
