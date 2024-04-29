const Player = require("../model/Player");

exports.listPlayers = async (req, res) => {
  if (req.query.pos) {
    console.log("Called with param");
    const pos = req.query.pos;
    await Player.find({ position: pos })
      .select("name nation club overall _id")
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
  } else if (req.query.name) {
    const name = req.query.name;
    await Player.find({ name: { $regex: new RegExp(name, "i") } })
      .select("name nation club overall _id")
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
    await Player.find()
      .select("name nation club overall _id")
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

exports.editPlayerDetails = async (req, res) => {
  const id = req.query.id;
  const reqBody = req.body;
  if (!reqBody) {
    return res.status(400).send({
      Status: "Failed",
      Message: "body cannot be empty",
    });
  } else {
    await Player.findOneAndUpdate({ _id: id }, reqBody)
      .then((player) => {
        return res.status(200).json({
          Status: "Success",
          Message: "Player Updated",
          data: player,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          Status: "Failed",
          Message: "Internal Server Error",
          data: err.message,
        });
      });
  }
};

exports.deletePlayerDetails = async (req, res) => {
  const id = req.query.id;
  await Player.findByIdAndDelete({ _id: id })
    .then((player) => {
      return res.status(200).json({
        Status: "Success",
        Message: "Player Deleted",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        Status: "Failed",
        Message: "Internal Server Error",
        data: err.message,
      });
    });
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
