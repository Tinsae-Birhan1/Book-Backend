import { AppDataSource } from "../data-source";
import { Order } from "../entity/orderEntity";
import { User } from "../entity/User.entity";

export class OrderService {
  static async placeOrder(userId: string, bookId: string, price: number) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });
    const orderRepository = AppDataSource.getRepository(Order);
    const order = new Order();
    order.userId = userId;
    order.bookId = bookId;
    order.points = price;
    if (!order.userId) {
      return { message: "User not found" };

    }

    if (user.points < order.points) {
      return { message: "Insufficient points to place the order" };

    }
    console.log(user.points)
    console.log("iiiiiiii")


    user.points -= price;
    await userRepository.save(user);
    console.log(user.points)





   
    
    
    await orderRepository.save(order);
    console.log(order.points)

    console.log(user.points)

    return { message: "Order placed successfully" };
  }
  static async getOrdersByUserId(userId: string) {
    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find({  where: { id: userId }  });
    return { data: orders };
  }

  static async getOrderById(orderId: string) {
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({ where: { id: orderId } });

    if (!order) {
      throw new Error("Order not found");
    }

    return { data: order };
  }

  static async getOrders() {
    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find();
    return { data: orders };
  }

  static async cancelOrder(orderId: string) {
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.findOne({ where: { id: orderId } });

    if (!order) {
      throw new Error("Order not found");
    }

    await orderRepository.remove(order);
    return { message: "Order canceled successfully" };
  }


}
