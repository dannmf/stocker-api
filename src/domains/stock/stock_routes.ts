import type { FastifyInstance } from "fastify";
import { stockController } from "./stock_controller";
import { authenticate } from "../../shared/middlewares/authenticate";

export async function stockRoutes(fastify: FastifyInstance) {
  fastify.post("/stock/add/:productId", {
    preHandler: authenticate,
    handler: stockController.addProductStock,
  });

  fastify.post("/stock/remove/:productId", {
    preHandler: authenticate,
    handler: stockController.removeProductStock,
  });

  fastify.post("/stock/adjust/:productId", {
    preHandler: authenticate,
    handler: stockController.adjustStock,
  });

  fastify.get("/stock/low", {
    preHandler: authenticate,
    handler: stockController.getLowStock,
  });

  fastify.get("/stock/movements/:productId", {
    preHandler: authenticate,
    handler: stockController.getMovementsByProduct,
  });

  fastify.get("/stock/movements", {
    preHandler: authenticate,
    handler: stockController.getAllMovements,
  });

  fastify.get("/stock/summary", {
    preHandler: authenticate,
    handler: stockController.getSummary,
  });
}
