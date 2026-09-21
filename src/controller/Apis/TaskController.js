const Task = require('../../model/task');
const statuscode = require('../../utils/statuscode');


class TaskController{
    async createTask(req,res){
        try {
            const{title,description,priority,dueDate,category,label}=req.body;

            if(!title || !dueDate){
                return res.status(statuscode.NOT_FOUND).json({
                    status:false,
                    message:"place provide title and dueDate"
                })
            }

            const taskdata = new Task({
                title,
                description,
                priority,
                dueDate,
                category:category||null,
                label:label || [],
                user:req.user.id
            })

            await taskdata.save();

            if(!taskdata){
                return res.status(statuscode.NOT_FOUND).json({
                    status:false,
                    message:"Task is not created"
                })
            }else{
                return res.status(statuscode.OK).json({
                    status:true,
                    message:"Task is created",
                    data:taskdata
                })
            }
            
        } catch (error) {
            return res.status(statuscode.SERVER_ERROR).json({
                status:false,
                message:error.message
            })
        }
    }

    async updateTask(req,res){
        try {
            const {id} = req.params;
            const {title,description,priority,dueDate,category,label}= req.body;

            const taskdata = await Task.findOneAndUpdate(
                {
                    _id:id,
                    user:req.user.id
                },
                {
                    title,
                    description,
                    priority,
                    dueDate,
                    category,
                    label
                },
                {
                    new:true,
                    runValidators:true
                }
            )

            if(!taskdata){
                return res.status(statuscode.NOT_FOUND).json({
                    status:false,
                    message:"Task is not updated"
                })
            }else{
                return res.status(statuscode.OK).json({
                    status:true,
                    message:"Task updated succesfully",
                    data:taskdata
                })
            }
            
        } catch (error) {
            return res.status(statuscode.SERVER_ERROR).json({
                status:false,
                message:error.message
            })
        }
    }

    async deleteTask(req,res){
        const {id}= req.params;
        try {
            const taskdata = await Task.findOneAndDelete({
                _id:id,
                user:req.user.id
            })

            if(!taskdata){
                return res.status(statuscode.NOT_FOUND).json({
                    status:false,
                    message:"Task is not deleted"
                })
            }else{
                return res.status(statuscode.OK).json({
                    status:true,
                    message:"Task deleted succesfully",
                    data:taskdata
                })
            }
            
        } catch (error) {
            return res.status(statuscode.SERVER_ERROR).json({
                status:false,
                message:error.message
            })
        }
    }

    async getTask(req,res){
        try {
            const taskdata = await Task.find({
                user:req.user.id
            })

            if(!taskdata){
                return res.status(statuscode.NOT_FOUND).json({
                    status:false,
                    message:"Task not found"
                })
            }else{
                return res.status(statuscode.OK).json({
                    status:true,
                    count:taskdata.length,
                    data:taskdata
                })
            }
            
        } catch (error) {
            return res.status(statuscode.SERVER_ERROR).json({
                status:false,
                message:error.message
            })
        }
    }

}

module.exports = new TaskController()