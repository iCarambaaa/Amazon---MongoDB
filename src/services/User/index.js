import userendpoint from './routers.js';
import express from 'express';

const { getAllUser, createUser, getUserById, updateUser, deleteUser } =
	userendpoint;

const userRouter = express.Router();
userRouter.route('/').post(createUser).get(getAllUser);
userRouter.route('/:id').put(updateUser).get(getUserById).delete(deleteUser);
export default userRouter;
