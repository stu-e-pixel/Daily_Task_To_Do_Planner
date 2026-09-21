const joi = require("joi");
class OtpSchemaValidation {
  static verifyOtp = joi.object({
    email: joi
      .string()
      .email()
      .required()
      .messages({
        "string.empty": "Email cannot be empty",
        "string.email": "Please provide a valid email address",
        "any.required": "Email is required",
      }),
    otp: joi
      .string()
      .pattern(/^[0-9]{4}$/)
      .required()
      .messages({
        "string.empty": "OTP cannot be empty",
        "string.pattern.base": "OTP must be a 4-digit number",
        "any.required": "OTP is required",
      }),
  });
}
module.exports = OtpSchemaValidation;
