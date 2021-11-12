import q2m from "query-to-mongo";
import ProductModel from "./schema.js";
import reviewsModel from "../reviews/schema.js";

const addImageToProduct =  async(req, res, next) => {
  try {
      const cloudImage = req.file.path
      
      const {name, description, price, imageUrl, brand, category} = req.body
      const newProduct = new ProductModel(name, description, price, imageUrl, brand, category, {$set: {imageUrl: cloudImage}})
      await newProduct.save()

      res.status(201).send({ newProduct })
  } catch (error) {
    next(error);
  }
};

const createNewProduct = async (req, res, next) => {
  try {
      const newProduct = new ProductModel(req.body)
      await newProduct.save()

      res.status(201).send({ newProduct })
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const mongoQuery = q2m(req.query);
    const total = await ProductModel.countDocuments(mongoQuery.criteria);
    const products = await ProductModel
      .find(mongoQuery.criteria)
      .limit(mongoQuery.options.limit)
      .skip(mongoQuery.options.skip)
      .sort(mongoQuery.options.sort)
      .populate({ path: "reviews" });
      res.send({
        links: mongoQuery.links("/products", total),
        pageTotal: Math.ceil(total / mongoQuery.options.limit),
        total,
        products,
      });
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
      const product = await ProductModel.findById(req.params.id)
      res.status(200).send({ product })
  } catch (error) {
    next(error);
  }
};

const editSingleProduct = async (req, res, next) => {
  try {
      const editedProduct = await ProductModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      )
      res.send({ editedProduct })
  } catch (error) {
    next(error);
  }
};

const deleteSingleProduct = async (req, res, next) => {
  try {
      const reviews = await reviewsModel.deleteMany({productId: req.params.id})
      const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id)
      // const deletedReviews = reviews.deleteMany({})
      res.status(204).send({ message: `${req.params.id} deleted!!`})
  } catch (error) {
    next(error);
  }
};




const productHandlers = {
  addImageToProduct,
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  editSingleProduct,
  deleteSingleProduct
  
};

export default productHandlers;
