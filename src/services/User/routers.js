import userModel from './schema.js';
import createHttpError from 'http-errors';
import q2m from 'query-to-mongo';

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
		if (Reviews) {
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

const userendpoint = {
	getAllUser,
	createUser,
	getUserById,
	updateUser,
	deleteUser,
};

export default userendpoint;
