const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LabelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user is required"],
    },
  },
  {
    timestamps: true,
  },
);

LabelSchema.index(
  {
    name: 1,
    user: 1,
  },
  {
    unique: true,
  },
);

const LabelModel = mongoose.model("label", LabelSchema);
module.exports = LabelModel;
