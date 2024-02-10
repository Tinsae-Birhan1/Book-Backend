import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

export class OrderController {
  static async placeOrder(req: Request, res: Response) {
    try {
      const { userId, bookId, points } = req.body;
      const result = await OrderService.placeOrder(userId, bookId, points);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to place order" });
    }
  }


  static async cancelOrder(req: Request, res: Response) {
    try {
      const {  orderId } = req.params;
      await OrderService.cancelOrder( orderId);
      res.status(200).json({ message: "Order canceled successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getOrders(req: Request, res: Response) {
    try {
      const result = await OrderService.getOrders();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getOrderById(req: Request, res: Response) {
    try {
      const { orderId } = req.params;
      const result = await OrderService.getOrderById(orderId);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getOrdersByUserId(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const result = await OrderService.getOrdersByUserId(userId);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
