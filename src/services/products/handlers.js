import q2m from "query-to-mongo";
import ProductModel from "./schema.js";

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
      .populate({ path: "review" });
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
      const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id)
      res.status(204).send({ message: `${req.params.id} deleted!!`})
  } catch (error) {
    next(error);
  }
};

const productHandlers = {
  createNewProduct,
  getAllProducts,
  getSingleProduct,
  editSingleProduct,
  deleteSingleProduct,
};

export default productHandlers;
