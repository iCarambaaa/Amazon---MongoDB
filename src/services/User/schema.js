import mongoose from 'mongoose';
import ProductModel from '../products/schema.js'
const { Schema, model } = mongoose;
const userSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		age: { type: Number, required: true },
		purchaseHistory: [
			{  type: Schema.Types.ObjectId, ref: "ProductModel"},
				// name: { type: String },
				// brand: { type: String },
				// price: { type: Number },
				// category: { type: String },
				// purchaseDate: { type: Date },
				// quantity: { type: Number}
			  
		],
	},
	{
		timestamps: true,
	},
);
export default model('User', userSchema);
