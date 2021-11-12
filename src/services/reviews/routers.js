import reviewsModel from './schema.js';
import createHttpError from 'http-errors';
import q2m from 'query-to-mongo';

const getAllReviews = async (req, res, next) => {
	try {
		const querys = q2m(req.query);
		const total = await reviewsModel.countDocuments(querys.criteria);
		const allReviews = await reviewsModel
			.find(querys.criteria)
			.limit(querys.options.limit)
			.skip(querys.options.skip)
			.sort(querys.options.sort);

		res.send({
			link: querys.links('/reviews/review', total),
			pageTotal: Math.ceil(total / querys.options.limit),
			total,
			allReviews,
		});
	} catch (error) {
		next(error);
	}
};

const createReviews = async (req, res, next) => {
	try {
		const newReviews = new reviewsModel(req.body);
		const { _id } = await newReviews.save();
		console.log(newReviews);
		res.status(200).send(_id);
	} catch (error) {
		next(error);
	}
};

const getReviewsById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const Reviews = await reviewsModel.findById(id);
		if (Reviews) {
			res.send(Reviews);
		}
	} catch (error) {
		next(error);
	}
};

const updateReviews = async (req, res, next) => {
	try {
		const id = req.params.id;
		const updateReviews = await reviewsModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (updateReviews) {
			res.send(updatecomment);
		} else {
			next(createHttpError(404, `Reviews with id ${id} not found!`));
		}
	} catch (error) {
		next(error);
	}
};

const deleteReviews = async (req, res, next) => {
	try {
		const id = req.params.id;
		const deleteReviews = await reviewsModel.findByIdAndDelete(id);
		if (deleteReviews) {
			res.status(200).send();
		} else {
			next(createHttpError(404, `dReviews with id ${id} not found!`));
		}
	} catch (error) {
		next(error);
	}
};

const reviewendpoint = {
	getAllReviews,
	createReviews,
	getReviewsById,
	updateReviews,
	deleteReviews,
};

export default reviewendpoint;
