import userendpoint from './routers.js';
import express from 'express';

const {
	getAllUser,
	createUser,
	getUserById,
	updateUser,
	deleteUser,
	pushproductinCart,
	getproductsinCart,
	getoneproductsinCart,
	editproductsinCart,
	deleteproductsinCart,
} = userendpoint;

const userRouter = express.Router();

userRouter.route('/').post(createUser).get(getAllUser);

userRouter.route('/:id').put(updateUser).get(getUserById).delete(deleteUser);

userRouter
	.route('/:id/purchaseHistory')
	.post(pushproductinCart)
	.get(getproductsinCart);

userRouter
	.route('/:id/purchaseHistory/:productId')
	.get(getoneproductsinCart)
	.put(editproductsinCart)
	.delete(deleteproductsinCart);

export default userRouter;
