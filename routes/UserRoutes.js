const { createUser, getUsers } = require('../controllers/UserControllers');

const userRouter = require('express').Router();

userRouter.post('/', createUser);
userRouter.get('/', getUsers);

module.exports = userRouter;
