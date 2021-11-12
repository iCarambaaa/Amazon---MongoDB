import reviewendpoint from './routers.js';
import express from 'express';

const {
	getAllReviews,
	createReviews,
	getReviewsById,
	updateReviews,
	deleteReviews,
} = reviewendpoint;

const reviewsRouter = express.Router();

reviewsRouter.route('/').post(createReviews).get(getAllReviews);

reviewsRouter
	.route('/:id')
	.put(updateReviews)
	.get(getReviewsById)
	.delete(deleteReviews);
export default reviewsRouter;
