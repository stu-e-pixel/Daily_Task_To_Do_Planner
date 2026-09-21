const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    reminderTime: {
      type: Date,
      required: true,
    },

    type: {
      type: String,
      enum: ["notification", "repeating"],
      default: "notification",
    },

    repeat: {
      type: String,
      enum: ["none", "daily", "weekly"],
      default: "none",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastSentAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ReminderModel = mongoose.model('reminder',ReminderSchema);
module.exports = ReminderModel;