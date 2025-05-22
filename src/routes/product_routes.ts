import { FastifyInstance } from "fastify";
import { productController } from "../controllers/product_controller";

export async function productRoutes(fastify: FastifyInstance) {
    fastify.post('/product', productController.create)

    fastify.get('/product', productController.getAll)

    fastify.get('/product/count', productController.getQuantity)

    fastify.get('/product/lowStock', productController.getLowStock)

    fastify.get('/product/:id', productController.getById)

    fastify.get('/product/category/:category', productController.getByCategory)

    fastify.put('/product/:id', productController.update)

    fastify.delete('/product/:id', productController.delete)
}