import { EntityRepository, Repository } from "typeorm";
import { Order } from "../entity/orderEntity";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  
  async findOrdersByUserId(userId: string): Promise<Order[]> {
    return this.createQueryBuilder("order")
      .where("order.userId = :userId", { userId })
      .getMany();
  }

  async findOrdersByBookId(bookId: string): Promise<Order[]> {
    return this.createQueryBuilder("order")
      .where("order.bookId = :bookId", { bookId })
      .getMany();
  }

  async cancelOrderByUserIdAndOrderId(userId: string, orderId: string): Promise<void> {
    const order = await this.findOne({ where: { id: orderId, userId } });
    if (!order) {
      throw new Error("Order not found for the user");
    }
   
  }

  
}
