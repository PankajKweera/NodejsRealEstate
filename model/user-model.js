const mongoose = require("mongoose");

// Schema--------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const userSchema = new mongoose.Schema(
  {
    phonenumber: {
      type: Number,
      unique: true,
      required: true,
      minimum: 10,
      maximum: 10,
    },
    username: {
      type: String,
      default: "xyz",
    },
    otp: {
      type: Number,
      minimum: 6,
      maximum: 6,
    },
    isverified: {
      type: Boolean,
      default: false,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Land",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Land",
      },
    ],
    land: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Land",
      },
    ],
    role: {
      type: String,
      enum: ["user", "agent", "admin"],
      required: true,
    },
    uniqueid: {
      type: String,
      unique: true,
    },
    shortlisted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    contacted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
    email: {
      type: String
    }
  },
  { timestamps: true }
);

// Model--------------------------------->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const User = mongoose.model("User", userSchema);

module.exports = User;
