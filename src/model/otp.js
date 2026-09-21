const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OtpSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,"UserId is required"]
    },
    otp:{
        type:String,
        required:[true,"Otp is required"]
    }
},{
    timestamps:true
})

const OtpModel = mongoose.model('otp',OtpSchema);
module.exports=OtpModel