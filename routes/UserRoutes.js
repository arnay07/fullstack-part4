const { createUser, getUsers } = require('../controllers/UserControllers');
const { getUser } = require('../services/UserServices');

const userRouter = require('express').Router();

userRouter.post('/', createUser);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);

module.exports = userRouter;
