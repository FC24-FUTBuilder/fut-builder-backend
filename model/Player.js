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
    },
    shooting: {
      type: Number,
    },
    passing: {
      type: Number,
    },
    dribbling: {
      type: Number,
    },
    defending: {
      type: Number,
    },
    physicality: {
      type: Number,
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
