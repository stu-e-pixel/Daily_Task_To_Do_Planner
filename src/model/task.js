
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    title:{
        type:String,
        required:[true,"Task Name is required"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Description is required"],
        trim:true
    },
    priority:{
        type:String,
        enum:["Low","Medium","High"],
        default:"Medium"
    },
    status:{
        type:String,
        enum:["Pending","Completed"],
        default:"Pending"
    },
    dueDate:{
        type:Date,
        required:true
    },
    completedAt:{
        type:Date,
        default:null
    },
    order:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,"User is required"]
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category',
        required:[true,"Category is required"]
    },
    label: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "label",
            required:[true,"label is required"]
        }
    ]

},{
    timestamps:true
})

const TaskModel = mongoose.model('task',TaskSchema);
module.exports=TaskModel