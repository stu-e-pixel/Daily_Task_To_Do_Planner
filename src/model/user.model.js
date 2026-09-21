const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        
    },
    phone:{
        type:String,
        required:[true,"Phone is required"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
        trim:true
    },
    image:{
        type:String,
        required:[true,"Image is required"],
        trim:true
    },
    public_Id:{
        type:String,

    },
    isVerified:{
        type:Boolean,
        default:false
    }

},{
    timestamps:true
})

const UserModel = mongoose.model('user',UserSchema);
module.exports=UserModel