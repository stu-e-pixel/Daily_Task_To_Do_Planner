const { required } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Description is required"],
        trim:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true,"user is required"]
    }
},{
    timestamps:true
})

CategorySchema.index(
    {
        name:1,
        user:1
    },
    {
        unique:true
    }
)

const CategoryModel = mongoose.model('category',CategorySchema)
module.exports=CategoryModel