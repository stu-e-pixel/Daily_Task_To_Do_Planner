const joi = require("joi");
class ReminderSchemaValidation {
  static createReminder = joi.object({
    task: joi
      .string()
      .hex()
      .length(24)
      .required()
      .messages({
        "string.empty": "Task cannot be empty",
        "string.hex": "Task must be a valid ObjectId",
        "string.length": "Task must be a valid ObjectId",
        "any.required": "Task is required",
      }),
    reminderTime: joi
      .date()
      .required()
      .messages({
        "date.base": "Please provide a valid reminder time",
        "any.required": "Reminder time is required",
      }),
    type: joi
      .string()
      .valid("notification", "repeating")
      .default("notification")
      .messages({ "any.only": "Type must be notification or repeating" }),
    repeat: joi
      .string()
      .valid("none", "daily", "weekly")
      .default("none")
      .messages({ "any.only": "Repeat must be none, daily or weekly" }),
    isActive: joi
      .boolean()
      .default(true)
      .messages({ "boolean.base": "isActive must be true or false" }),
    lastSentAt: joi
      .date()
      .allow(null)
      .optional()
      .messages({ "date.base": "Please provide a valid last sent date" }),
  });
  static updateReminder = joi.object({
    task: joi
      .string()
      .hex()
      .length(24)
      .messages({
        "string.hex": "Task must be a valid ObjectId",
        "string.length": "Task must be a valid ObjectId",
      }),
    reminderTime: joi
      .date()
      .messages({ "date.base": "Please provide a valid reminder time" }),
    type: joi
      .string()
      .valid("notification", "repeating")
      .messages({ "any.only": "Type must be notification or repeating" }),
    repeat: joi
      .string()
      .valid("none", "daily", "weekly")
      .messages({ "any.only": "Repeat must be none, daily or weekly" }),
    isActive: joi
      .boolean()
      .messages({ "boolean.base": "isActive must be true or false" }),
    lastSentAt: joi
      .date()
      .allow(null)
      .messages({ "date.base": "Please provide a valid last sent date" }),
  });
}
module.exports = ReminderSchemaValidation;
