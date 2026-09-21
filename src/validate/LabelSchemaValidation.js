const joi = require("joi");
class LabelSchemaValidation {
  static createLabel = joi.object({
    name: joi
      .string()
      .required()
      .trim()
      .messages({
        "string.empty": "Name cannot be empty",
        "string.required": "Name is required",
        "any.required": "Name is required",
      }),
  });
  static updateLabel = joi.object({
    name: joi
      .string()
      .required()
      .trim()
      .messages({
        "string.empty": "Name cannot be empty",
        "string.required": "Name is required",
        "any.required": "Name is required",
      }),
  });
}
module.exports = LabelSchemaValidation;
