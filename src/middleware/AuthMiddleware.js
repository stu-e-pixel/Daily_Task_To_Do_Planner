const statuscode = require('../utils/statuscode')
const jwt = require('jsonwebtoken')
const User = require('../model/user.model')

class AuthMiddleware {
    static async verifyToken(req,res,next){
        try {
            const token = req.headers.authorization;
            if(!token || !token.startsWith('Bearer ')){
                return res.status(statuscode.NOT_FOUND).json({
                    status:false,
                    message:"place provide token"
                })
            }

            const cleanToken = await token.split(" ")[1];
            const decoded =  jwt.verify(cleanToken,process.env.JWT_SECRET_KEY)
            const user = await User.findById(decoded.id)

            if(!user){
                return res.status(statuscode.NOT_FOUND).json({
                    status:false,
                    message:"user is not found"
                })
            }

            req.user={
                id:user._id,
                name:user.name,
                email:user.email
            }

            next()
            
        } catch (error) {
            return res.status(statuscode.NOT_FOUND).json({
                status:false,
                message:"invalid token"
            })
        }
    }

}

module.exports= AuthMiddleware