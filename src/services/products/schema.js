import mongoose from "mongoose"

const { Schema, model} = mongoose

const productSchema = new Schema(
    {
        name: {type:String, required: true},
        description: {type:String, required: true},
        brand: {type:String, required: true},
        imageUrl: {type:String, required: true},
        price: {type:Number, required: true},
        category: {type:String, required: false},
        quantity: { type:Number},
        reviews: [
            { type: Schema.Types.ObjectId, ref:"Review"}
        ]
    },
    {timestamps: true}
)

export default model("ProductModel", productSchema)