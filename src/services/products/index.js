import express from "express"
import productHandlers from "./handlers.js"

const productsRouter = express.Router()

productsRouter.route("/")
.get(productHandlers.getAllProducts)
.post(productHandlers.createNewProduct)

productsRouter.route("/:id")
.get(productHandlers.getSingleProduct)
.put(productHandlers.editSingleProduct)
.delete(productHandlers.deleteSingleProduct)

export default productsRouter