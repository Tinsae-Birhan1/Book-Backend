import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";

export class UserRepository {
  static async createUser(userData: Partial<User>) {
    const userRepository = AppDataSource.getRepository(User);
    const user = userRepository.create(userData);
    return await userRepository.save(user);
  }

  static async getAllUsers() {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.find();
  }

  static async getUserById(id: string) {
    const userRepository = AppDataSource.getRepository(User);
    return await userRepository.findOne({ where: { id } });
  }

  static async updateUser(id: string, userData: Partial<User>) {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.update(id, userData);
    return await userRepository.findOne({ where: { id } });
  }

  static async deleteUser(id: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) throw new Error("User not found");
    await userRepository.remove(user);
    return user;
  }
}
