const User = require('../models/User');

const createUser = (user) => User.create(user);

const getUser = (id) => User.findById(id);

const getUsers = () =>
  User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });

module.exports = {
  createUser,
  getUsers,
  getUser,
};
