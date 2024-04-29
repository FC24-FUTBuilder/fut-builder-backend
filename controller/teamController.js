const Team = require("../model/Team");

exports.createTeam = async (req, res) => {
  const reqBody = req.body;
  if (!reqBody) {
    res.status(400).send({
      Status: "Failed",
      Message: "body cannot be empty",
    });
  } else {
    const teamData = new Team({
      players: reqBody.players,
      formation: reqBody.formation,
      overallRating: reqBody.overallRating,
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
};

exports.getTeam = async (req, res) => {
  if (req.query.id) {
    await Team.findById(req.query.id)
      .populate("players")
      .then((team) => {
        res.status(200).json({
          Status: "Success",
          Message: "Team Retrieved",
          data: team,
        });
      })
      .catch((err) => {
        res.status(500).json({
          Status: "Failed",
          Message: "Internal Server Error",
          data: err.message,
        });
      });
  } else {
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
  }
};
