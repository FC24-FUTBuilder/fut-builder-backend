const mongoose = require("mongoose");
let teamSchema = new mongoose.Schema(
  {
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: true,
      },
    ],
    formation: {
      type: String,
    },
    overallRating: {
      type: Number,
      // required: true,
    },
    teamChemistry: {
      type: Number,
      // required: true,
    },
  },
  { timestamps: true, collection: "Team_Details" }
);

module.exports = mongoose.model("Team", teamSchema);
