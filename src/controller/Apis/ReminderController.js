const Reminder = require('../../model/reminder');
const Task = require('../../model/task');
const statuscode = require('../../utils/statuscode');
class ReminderController{
    async createReminder(req,res){
        try {
            const{task,reminderTime,type,repeat}=req.body;
            const tasks = await Task.findOne({
                _id:task,
                user:req.user.id
            })

            if(!tasks){
                return res.status(statuscode.NOT_FOUND).json({
                status:false,
                message:"Task is not found"
            })
            }

            const reminderdata = new Reminder({
                task:task,
                user:req.user.id,
                reminderTime,
                type,
                repeat
            })

            await reminderdata.save()

            if(!reminderdata){
                return res.status(statuscode.NOT_FOUND).json({
                status:false,
                message:"Reminder is not created"
            })
            }else{
                return res.status(statuscode.OK).json({
                status:true,
                message:"Reminder created succesfully",
                data:reminderdata
            })
            }

        } catch (error) {
            return res.status(statuscode.SERVER_ERROR).json({
                status:false,
                message:error.message
            })
        }
    }

    async updateReminder(req, res) {
    try {
      const { reminderId } = req.params;

      const {
        reminderTime,
        type,
        repeat,
        isActive,
      } = req.body;

      const reminder = await Reminder.findOneAndUpdate(
        {
          _id: reminderId,
          user: req.user.id,
        },
        {
          reminderTime,
          type,
          repeat,
          isActive,
        },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!reminder) {
        return res.status(404).json({
          success: false,
          message: "Reminder not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Reminder updated successfully",
        data: reminder,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

   async deleteReminder(req, res) {
    try {
      const { reminderId } = req.params;

      const reminder = await Reminder.findOneAndDelete({
        _id: reminderId,
        user: req.user.id,
      });

      if (!reminder) {
        return res.status(404).json({
          success: false,
          message: "Reminder not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Reminder deleted successfully",
      });
    } catch (error) {
      return res.status(statuscode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getReminders(req,res){
    try {
        const reminder = await Reminder.find({
            user:req.user.id
        })

        if (!reminder) {
        return res.status(statuscode.NOT_FOUND).json({
          success: false,
          message: "Reminder not found",
        });
      }

      return res.status(statuscode.OK).json({
        success: true,
        count:reminder.length,
        data:reminder
      });
        
    } catch (error) {
        return res.status(statuscode.SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

}

module.exports=new ReminderController()