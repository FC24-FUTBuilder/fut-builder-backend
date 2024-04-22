const Player = require("../model/Player");

exports.listPlayers = async (req, res) => {
  if (req.query.pos) {
    console.log("Called with param");
    const pos = req.query.pos;
    const page = parseInt(req.query.page, 10) || 1;
    await Player.find({ position: pos })
      .select("name nation club overall _id")
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
  } else {
    const page = parseInt(req.query.page, 10) || 1;
    await Player.find()
      .select("name nation club overall _id")
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
  }
};

exports.getPlayerDetails = async (req, res) => {
  const id = req.query.id;
  await Player.findOne({ _id: id })
    .then((player) => {
      res.status(200).json({
        Status: "Success",
        Message: "Player Retrieved",
        data: player,
      });
    })
    .catch((err) => {
      res.status(500).json({
        Status: "Failed",
        Message: "Internal Server Error",
        data: err.message,
      });
    });
};
