import express from "express"
import productHandlers from "./handlers.js"
import {CloudinaryStorage} from "multer-storage-cloudinary";
import multer from "multer";
import {v2 as cloudinary} from "cloudinary";


const cloudinaryStorage = new CloudinaryStorage({cloudinary, params: {folder: "amazonBE"}})

const productsRouter = express.Router()


productsRouter.route("/image")
.post(multer({storage: cloudinaryStorage}).single("img"), productHandlers.addImageToProduct)


productsRouter.route("/")
.get(productHandlers.getAllProducts)
.post(productHandlers.createNewProduct)

productsRouter.route("/:id")
.get(productHandlers.getSingleProduct)
.put(productHandlers.editSingleProduct)
.delete(productHandlers.deleteSingleProduct)



export default productsRouter