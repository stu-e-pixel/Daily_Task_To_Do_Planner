const joi = require('joi');
class UserSchemaValidation{

    static signup = joi.object({
        name:joi.string().required().trim().messages({
            "string.required":"name is required",
            "any.required":"Name is required"
        }),
        email:joi.string().email().required().messages({
            "string.email":"place provide A valid email address",
            "string.required":"Email is required",
            "any.required":"Email is required"
        }),
        phone:joi.string().pattern(/^[6-9]\d{9}$/).required().trim().messages({
            "string.pattern.base":"Place provide 10 digit valid phone number",
            "string.required":"Phone number is required",
            "any.required":"Phone number is required"
        }),
        password:joi.string().min(6).max(15).required().trim().messages({
            "string.min":"place provide minimum 6-digit password",
            "string.max":"you are not put upto 15-digit",
            "string.required":"password is required",
            "any.required":"password is required"
        })
    })
    static login = joi.object({
        email:joi.string().email().required().trim().messages({
            "string.email":"place provide A valid email address",
            "string.required":"Email is required",
            "any.required":"Email is required"
        }),
        password:joi.string().required().trim().messages({
            "string.required":"password is required",
            "any.required":"Password is required"
        })
    })

}

module.exports= UserSchemaValidation