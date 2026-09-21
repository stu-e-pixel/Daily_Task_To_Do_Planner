const joi = require("joi");
class TaskSchemaValidation {
  static createTask = joi.object({
    title: joi
      .string()
      .required()
      .trim()
      .messages({
        "string.empty": "Task title cannot be empty",
        "string.required": "Task title is required",
        "any.required": "Task title is required",
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
    priority: joi
      .string()
      .valid("Low", "Medium", "High")
      .default("Medium")
      .messages({ "any.only": "Priority must be Low, Medium or High" }),
    status: joi
      .string()
      .valid("Pending", "Completed")
      .default("Pending")
      .messages({ "any.only": "Status must be Pending or Completed" }),
    dueDate: joi
      .date()
      .required()
      .messages({
        "date.base": "Please provide a valid due date",
        "any.required": "Due date is required",
      }),
    completedAt: joi
      .date()
      .allow(null)
      .optional()
      .messages({ "date.base": "Please provide a valid completed date" }),
    order: joi
      .number()
      .integer()
      .default(0)
      .messages({
        "number.base": "Order must be a number",
        "number.integer": "Order must be an integer",
      }),
    category: joi
      .string()
      .hex()
      .length(24)
      .required()
      .messages({
        "string.hex": "Category must be a valid ObjectId",
        "string.length": "Category must be a valid ObjectId",
        "any.required": "Category is required",
      }),
    label: joi
      .array()
      .items(
        joi
          .string()
          .hex()
          .length(24)
          .messages({
            "string.hex": "Label must be a valid ObjectId",
            "string.length": "Label must be a valid ObjectId",
          }),
      )
      .required()
      .messages({
        "array.base": "Label must be an array",
        "any.required": "Label is required",
      }),
  });
  static updateTask = joi.object({
    title: joi
      .string()
      .trim()
      .messages({ "string.empty": "Task title cannot be empty" }),
    description: joi
      .string()
      .trim()
      .messages({ "string.empty": "Description cannot be empty" }),
    priority: joi
      .string()
      .valid("Low", "Medium", "High")
      .messages({ "any.only": "Priority must be Low, Medium or High" }),
    status: joi
      .string()
      .valid("Pending", "Completed")
      .messages({ "any.only": "Status must be Pending or Completed" }),
    dueDate: joi
      .date()
      .messages({ "date.base": "Please provide a valid due date" }),
    completedAt: joi
      .date()
      .allow(null)
      .messages({ "date.base": "Please provide a valid completed date" }),
    order: joi
      .number()
      .integer()
      .messages({
        "number.base": "Order must be a number",
        "number.integer": "Order must be an integer",
      }),
    category: joi
      .string()
      .hex()
      .length(24)
      .messages({
        "string.hex": "Category must be a valid ObjectId",
        "string.length": "Category must be a valid ObjectId",
      }),
    label: joi
      .array()
      .items(
        joi
          .string()
          .hex()
          .length(24)
          .messages({
            "string.hex": "Label must be a valid ObjectId",
            "string.length": "Label must be a valid ObjectId",
          }),
      )
      .messages({ "array.base": "Label must be an array" }),
  });
}
module.exports = TaskSchemaValidation;
