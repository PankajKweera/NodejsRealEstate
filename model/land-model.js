const mongoose = require("mongoose");

const land = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    address: {
      country: {
        type: String,
        default: "India",
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      pin_code: {
        type: Number,
        required: true,
      },
    },
    
    area: {
      type: Number,
      require: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: [String],
    video: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "rejected", "verified"],
      default: "pending",
    },
    verifiedby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Land = mongoose.model("Land", land);

module.exports = Land;
