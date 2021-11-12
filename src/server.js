import express from 'express';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import mongoose from "mongoose"
import reviewsRouter from './services/reviews/index.js';
import productsRouter from "./services/products/index.js";
import cartsRouter from "./services/shoppingCart/index.js"
import { notFoundHandler, badRequestHandler, genericErrorHandler, unauthorizedHandler } from "./errorHandlers.js"

const server = express();

const port = process.env.PORT || 3001

// ********************************* MIDDLEWARES ***************************************

server.use(cors())
server.use(express.json())

// ********************************* ROUTES ********************************************

server.use("/reviews", reviewsRouter)
server.use("/products", productsRouter)
server.use("/shoppingCart", cartsRouter) 

// ********************************* ERROR HANDLERS ************************************

server.use(notFoundHandler)
server.use(unauthorizedHandler)
server.use(badRequestHandler)
server.use(genericErrorHandler)


mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () => {
    console.log("Mongo Connected!")


server.listen(port, () => {
    
  console.table(listEndpoints(server))
    console.log(`✅ Server running on port ${port}`)
})
})

mongoose.connection.on("error", err => {
  console.log(err)
})