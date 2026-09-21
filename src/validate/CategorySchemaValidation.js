const joi = require("joi");
class CategorySchemaValidation {
  static createCategory = joi.object({
    name: joi
      .string()
      .required()
      .trim()
      .messages({
        "string.empty": "Name cannot be empty",
        "string.required": "Name is required",
        "any.required": "Name is required",
      }),
    description: joi
      .string()
      .required()
      .trim()
      .messages({
        "string.empty": "Description cannot be empty",
        "string.required": "Description is required",
        "any.required": "Description is required",
      }),
  });
  static updateCategory = joi.object({
    name: joi
      .string()
      .required()
      .trim()
      .messages({
        "string.empty": "Name cannot be empty",
        "string.required": "Name is required",
        "any.required": "Name is required",
      }),
    description: joi
      .string()
      .required()
      .trim()
      .messages({
        "string.empty": "Description cannot be empty",
        "string.required": "Description is required",
        "any.required": "Description is required",
      }),
  });
}
module.exports = CategorySchemaValidation;
