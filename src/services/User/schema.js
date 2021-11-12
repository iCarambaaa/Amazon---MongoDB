import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const userSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: Number, required: true },
		email: { type: Number, required: true },
		age: { type: String, required: true },
		purchaseHistory: [
			
		],
	},
	{
		timestamps: true,
	},
);
export default model('User', userSchema);
