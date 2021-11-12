import userModel from './schema.js';
import createHttpError from 'http-errors';
import q2m from 'query-to-mongo';
import ProductModel from '../products/schema.js';

const getAllUser = async (req, res, next) => {
	try {
		const querys = q2m(req.query);
		const total = await userModel.countDocuments(querys.criteria);
		const allUser = await userModel
			.find(querys.criteria)
			.limit(querys.options.limit)
			.skip(querys.options.skip)
			.sort(querys.options.sort);

		res.send({
			link: querys.links('/users/user', total),
			pageTotal: Math.ceil(total / querys.options.limit),
			total,
			allUser,
		});
	} catch (error) {
		next(error);
	}
};

const createUser = async (req, res, next) => {
	try {
		const newUser = new userModel(req.body);
		const { _id } = await newUser.save();
		console.log(newUser);
		res.status(200).send(_id);
	} catch (error) {
		next(error);
	}
};

const getUserById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const User = await userModel.findById(id);
		if (User) {
			res.send(User);
		}
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const updateUser = await userModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (updateReviews) {
			res.send(updateUser);
		} else {
			next(createHttpError(404, `Reviews with id ${id} not found!`));
		}
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const id = req.params.id;
		const deleteUser = await userModel.findByIdAndDelete(id);
		if (deleteUser) {
			res.status(200).send();
		} else {
			next(createHttpError(404, `dReviews with id ${id} not found!`));
		}
	} catch (error) {
		next(error);
	}
};

const pushproductinCart = async (req, res, next) => {
	try {
		const product = await ProductModel.findById(req.body.productID, { _id: 0 });
		if (product) {
			const addproduct = { ...product.toObject(), purchaseDate: new Date() };
			const updatedUser = await userModel.findByIdAndUpdate(
				req.params.id,
				{ $push: { purchaseHistory: addproduct } },
				{ new: true },
			);
			if (updatedUser) {
				res.send(updatedUser);
			} else {
				next(createHttpError(404, `User with id ${req.params.id} not found!`));
			}
		} else {
			next(
				createHttpError(404, `Book with id ${req.body.productId} not found!`),
			);
		}
	} catch (error) {
		next(error);
	}
};

const getproductsinCart = async (req, res, next) => {
	try {
		const usercart = await userModel.findById(req.params.id);
		if (usercart) {
			res.send(usercart.purchaseHistory);
		} else {
			next(createHttpError(404, `User with id ${req.params.id} not found!`));
		}
	} catch (error) {
		next(error);
	}
};

const getoneproductsinCart = async (req, res, next) => {
	try {
		const usercart = await userModel.findById(req.params.id);
		if (usercart) {
			const purchasedItem = user.purchaseHistory.find(
				(item) => item._id.toString() === req.params.productId,
			);
			if (purchasedItem) {
				res.send(purchasedItem);
			} else {
				next(
					createHttpError(
						404,
						`Product with id ${req.params.productId} not found!`,
					),
				);
			}
		} else {
			next(createHttpError(404, `User with id ${req.params.id} not found!`));
		}
	} catch (error) {
		next(error);
	}
};

const editproductsinCart = async (req, res, next) => {
	try {
		const user = await userModel.findById(req.params.id);
		if (user) {
			const index = user.purchaseHistory.findIndex(
				(p) => p._id.toString() === req.params.productId,
			);
			if (index !== 1) {
				user.purchaseHistory[index] = {
					...user.purchaseHistory[index].toObject(),
					...req.body,
				};
				await user.save();
				res.send(user);
			} else {
				createHttpError(
					404,
					`Product with id ${req.params.productId} not found!`,
				);
			}
		} else {
			next(createHttpError(404, `User with id ${req.params.id} not found!`));
		}
	} catch (error) {
		next(error);
	}
};

const deleteproductsinCart = async (req, res, next) => {
	try {
		const modifiedUser = await userModel.findById(
			req.params.id,
			{ $pull: { purchaseHistory: { _id: req.params.productId } } },
			{ new: true },
		);
		if (modifiedUser) {
			res.send(modifiedUser);
		} else {
			next(createHttpError(404, `User with id ${req.params.id} not found!`));
		}
	} catch (error) {
		next(error);
	}
};

const userendpoint = {
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
};

export default userendpoint;
