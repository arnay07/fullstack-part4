const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).send({ error: "username missing" });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: "invalid username" });
  }
  if (!password) {
    return res.status(400).send({ error: "password missing" });
  }
  const passwordCorrect = bcrypt.compare(password, user.passwordHash);
  if (!passwordCorrect) {
    return res.status(401).json({ error: "invalid password" });
  }
  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  res.status(200).send({ token, username: user.username, name: user.name });
};

module.exports = {
  login,
};
