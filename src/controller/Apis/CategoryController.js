const Category = require('../../model/category')
const statuscode = require('../../utils/statuscode')
class CategoryController{
    async createCategory(req,res){
        try {
            const {name,description} = req.body;
            if(!name || !description){
                return res.status(statuscode.NOT_FOUND).json({
                    status:false,
                    message:"Category name and description is required"
                })
            }

            const categorydata = new Category({
                name,
                description,
                user:req.user.id
            })

            await categorydata.save();

            if(!categorydata){
                return res.status(statuscode.NOT_FOUND).json({
                    status:false,
                    message:"Category is not created"
                })
            }else{
                return res.status(statuscode.OK).json({
                    status:true,
                    message:"Category is created succefully",
                    data:categorydata
                })
            }
            
        } catch (error) {
            return res.status(statuscode.SERVER_ERROR).json({
                status:false,
                message:error.message
            })
        }
    }

    async updateCategory(req,res){
        try {
            const{id}=req.params
            const {name,description}=req.body

            const categorydata = await Category.findOneAndUpdate(
                {
                    _id:id,
                    user:req.user.id
                },
                {
                    name:name,
                    description:description
                },
                {
                    new:true,
                    runValidators:true
                }
            )

            if(!categorydata){
                return res.status(statuscode.NOT_FOUND).json({
                    status:false,
                    message:"Category is not updated"
                })
            }else{
                return res.status(statuscode.OK).json({
                    status:true,
                    message:"Category  updated succefully",
                    data:categorydata
                })
            }
            
        } catch (error) {
            return res.status(statuscode.SERVER_ERROR).json({
                status:false,
                message:error.message
            })
        }
    }

    async deleteCategory(req,res){
        try {
            const {id}=req.params
            
            const categorydata = await Category.findOneAndDelete({
                _id:id,
                user:req.user.id
            })
            
            if (!categorydata) {
                return res.status(statuscode.NOT_FOUND).json({
                    status: false,
                    message: "Task Category is not deleted"
                });
            }
    
            return res.status(statuscode.OK).json({
                status: true,
                message: "Task Category is deleted succesfully",
            });
    
        } catch (error) {
            return res.status(statuscode.SERVER_ERROR).json({
                status: false,
                message: error.message
            });
        }
    }
    
    async getCategory(req,res){
        try {
            const categorydata = await Category.find({
                user:req.user.id
            })
    
            if (!categorydata) {
                return res.status(statuscode.NOT_FOUND).json({
                    status: false,
                    message: "Task Category is not found"
                });
            }
    
            return res.status(statuscode.OK).json({
                status: true,
                count:categorydata.length,
                data: categorydata
            });
            
        } catch (error) {
            return res.status(statuscode.SERVER_ERROR).json({
                status: false,
                message: error.message
            });
        }
    }

}

module.exports=new CategoryController()