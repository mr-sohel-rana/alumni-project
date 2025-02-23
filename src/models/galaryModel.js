const mongoose=require("mongoose")

const gelarySchema=mongoose.Schema({
    image:{type:String,required:true},
    title:{type:String,require:true}
})
const galaryModel=mongoose.model("galary",gelarySchema)
module.exports=galaryModel;