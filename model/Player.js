const mongoose = require("mongoose");

let playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nation: {
      type: String,
      required: true,
    },
    club: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    overall: {
      type: Number,
      required: true,
    },
    pace: {
      type: Number,
      required: true,
    },
    shooting: {
      type: Number,
      required: true,
    },
    passing: {
      type: Number,
      required: true,
    },
    dribbling: {
      type: Number,
      required: true,
    },
    defending: {
      type: Number,
      required: true,
    },
    physicality: {
      type: Number,
      required: true,
    },
    card_image: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true, collection: "Player_Details" }
);

module.exports = mongoose.model("Player", playerSchema);
