import * as express from "express";
import { OrderController } from "../controllers/orderController";

const router = express.Router();

router.post("/order", OrderController.placeOrder);
router.delete("/order/:orderId", OrderController.cancelOrder);
router.get('/orders/:id', OrderController.getOrderById);
router.get('/orders/', OrderController.getOrders);
router.delete('/orders/:id/cancel', OrderController.cancelOrder);
export { router as orderRouter };
