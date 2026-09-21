const Label = require("../../model/label");
const statuscode = require("../../utils/statuscode");
class LabelController {
  async createLabel(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(statuscode.NOT_FOUND).json({
          status: false,
          message: "Label name is required",
        });
      }

      const labeldata = new Label({
        name,
        user:req.user.id
      })
      await labeldata.save();

      if(!labeldata){
        return res.status(statuscode.NOT_FOUND).json({
            status:false,
            message:"Task Label is not created",   
        })
      }else{
        return res.status(statuscode.OK).json({
            status:true,
            message:"Task Label is created",
            data:labeldata
        })
      }

    } catch (error) {
        return res.status(statuscode.SERVER_ERROR).json({
            status:false,
            message:error.message
        })
    }
  }

  async updateLabel(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        console.log("URL Label ID:", id);
        console.log("Logged in User ID:", req.user.id);

        const checkLabel = await Label.findById(id);

        console.log("Label from DB:", checkLabel);

        if (!name) {
            return res.status(statuscode.NOT_FOUND).json({
                status: false,
                message: "Label name is required"
            });
        }

        const labeldata = await Label.findOneAndUpdate(
            {
                _id: id,
                user: req.user.id
            },
            {
                name: name
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!labeldata) {
            return res.status(statuscode.NOT_FOUND).json({
                status: false,
                message: "Task Label is not updated"
            });
        }

        return res.status(statuscode.OK).json({
            status: true,
            message: "Task Label is updated",
            data: labeldata
        });

    } catch (error) {
        return res.status(statuscode.SERVER_ERROR).json({
            status: false,
            message: error.message
        });
    }
}

async deleteLabel(req,res){
    try {
        const {id}=req.params
        
        const labeldata = await Label.findOneAndDelete({
            _id:id,
            user:req.user.id
        })
        
        if (!labeldata) {
            return res.status(statuscode.NOT_FOUND).json({
                status: false,
                message: "Task Label is not deleted"
            });
        }

        return res.status(statuscode.OK).json({
            status: true,
            message: "Task Label is deleted succesfully",
        });

    } catch (error) {
        return res.status(statuscode.SERVER_ERROR).json({
            status: false,
            message: error.message
        });
    }
}

async getLabels(req,res){
    try {
        const labeldata = await Label.find({
            user:req.user.id
        })

        if (!labeldata) {
            return res.status(statuscode.NOT_FOUND).json({
                status: false,
                message: "Task Label is not found"
            });
        }

        return res.status(statuscode.OK).json({
            status: true,
            count:labeldata.length,
            data: labeldata
        });
        
    } catch (error) {
        return res.status(statuscode.SERVER_ERROR).json({
            status: false,
            message: error.message
        });
    }
}
}

module.exports = new LabelController();
