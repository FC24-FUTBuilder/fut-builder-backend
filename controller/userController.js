const User = require("../model/User");

exports.createUser = async (req, res) => {
  const reqJson = req.body;
  if (!reqJson) {
    res.status(400).send({
      Status: "Failed",
      Message: "body cannot be empty",
    });
  } else {
    const newUser = new User({
      username: reqJson.username,
      email: reqJson.email,
      password: reqJson.password,
    });
    await User.create(newUser)
      .then((user) => {
        console.log(user);
        res.status(200).json({
          Status: "Success",
          Message: "User Created",
          data: user.toJSON(),
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

exports.loginUser = async (req, res) => {
  const reqBody = req.body;
  if (!reqBody) {
    res.status(400).send({
      Status: "Failed",
      Message: "body cannot be empty",
    });
  } else {
    await User.findOne({ username: reqBody.username })
      .then((user) => {
        if (!user) {
          res.status(404).send({
            Status: "Failed",
            Message: "User not found",
          });
        } else {
          if (user.password === reqBody.password) {
            res.status(200).send({
              Status: "Success",
              Message: "User logged in",
              data: user.toJSON(),
            });
          } else {
            res.status(403).send({
              Status: "Failed",
              Message: "Invalid password",
            });
          }
        }
      })
      .catch((err) => {
        res.status(500).send({
          Status: "Failed",
          Message: "Internal Server Error",
          data: err.message,
        });
      });
  }
};

/**
 * Need to create showUsers, updateUsers, deleteUser functionality
 */
