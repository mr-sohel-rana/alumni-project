const mongoose=require("mongoose")

const carocelSchema=mongoose.Schema({
    image:{type:String,required:true}
})
const carocelModel=mongoose.model("homeImage",carocelSchema)
module.exports=carocelModel;