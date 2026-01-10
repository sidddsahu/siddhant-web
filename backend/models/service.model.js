const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    fullDescription: {
      type: String,
      required: true
    },
    features: {
      type: [String],
      required: true
    },
    gradient: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
