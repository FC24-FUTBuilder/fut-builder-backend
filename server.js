const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const csvParser = require("csv-parser");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
/**
 * Dotenv configuration
 */
require("dotenv").config();

/**
 * Instantiating models
 */
const User = require("./model/User");
const Player = require("./model/Player");
const Team = require("./model/Team");

/**
 * Calling routers
 */

const userRoutes = require("./routes/userRoutes.js");

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb" }));
const port = process.env.PORT || 8000;

//** DB Connect */
const uri = process.env.DB_URI;
mongoose
  .connect(uri)
  .then(() => console.log("Mongo DB Connection was Successful"))
  .catch((err) => console.log("Some Error occurred: " + err));

app.use("/users", userRoutes);

/**
 * This can be changed later to just have JSON data in the body
 * Used file upload functionality to check if the data is added to the database correctly
 */

app.post("/teams/create", async (req, res) => {
  const reqBody = req.body;
  if (!reqBody) {
    res.status(400).send({
      Status: "Failed",
      Message: "body cannot be empty",
    });
  } else {
    // const newTeam = new Team({
    //   players: reqBody.players,
    //   overallRating: reqBody.overallRating,
    //   teamChemistry: reqBody.teamChemistry,
    // });

    const teamData = new Team({
      players: reqBody.players,
    });
    await Team.create(teamData)
      .then((team) => {
        res.status(200).json({
          Status: "Success",
          Message: "Team Created",
          data: team.toJSON(),
        });
      })
      .catch((err) => {
        res.status(500).json({
          Status: "Failed",
          Message: "Internal Server Error",
          data: err.message,
        });
      });
  }
});

app.get("/teams/get", async (req, res) => {
  await Team.find()
    .populate("players")
    .then((teams) => {
      res.status(200).json({
        Status: "Success",
        Message: "Teams Retrieved",
        data: teams,
      });
    })
    .catch((err) => {
      res.status(500).json({
        Status: "Failed",
        Message: "Internal Server Error",
        data: err.message,
      });
    });
});

app.get("/players/list", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  await Player.find()
    .select("name _id")
    .limit(10)
    .skip((page - 1) * 10)
    .then((players) => {
      res.status(200).json({
        Status: "Success",
        Message: "Players Retrieved",
        data: players,
      });
    })
    .catch((err) => {
      res.status(500).json({
        Status: "Failed",
        Message: "Internal Server Error",
        data: err.message,
      });
    });
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const playersData = [];
  fs.createReadStream(req.file.path)
    .pipe(csvParser())
    .on("data", (data) => playersData.push(data))
    .on("end", async () => {
      fs.unlinkSync(req.file.path);
      const playerResults = await pushPlayers(playersData);
      res.status(200).json({
        Status: "Success",
        Message: "File Uploaded",
        data: playerResults,
      });
    })
    .on("error", (err) => {
      res.status(500).json({
        Status: "Failed",
        Message: "Internal Server Error",
        data: err.message,
      });
    });
});

app.get("/test", (req, res) => {
  console.log("Response Received");
  res.send({
    status: "Success",
  });
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

async function pushPlayers(players) {
  const results = [];
  for (const player of players) {
    const newPlayer = new Player({
      name: player.Name,
      nation: player.Nation,
      club: player.Club,
      position: player.Position,
      age: player.Age,
      overall: player.Overall,
      pace: player.Pace,
      shooting: player.Shooting,
      passing: player.Passing,
      dribbling: player.Dribbling,
      defending: player.Defending,
      physicality: player.Physicality,
      card_image: player.Card_image,
      gender: player.Gender,
    });
    await Player.create(newPlayer)
      .then((player) => {
        results.push({ player: `${player.name} added` });
      })
      .catch((err) => {
        results.push({
          player: `Error while adding ${player.name}`,
          error: err.message,
        });
      });
  }
  return results;
}
