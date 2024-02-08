import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { EncryptHelper } from "../helpers/encrypt";

export class AuthService {
  static async login(email: string, password: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user || !EncryptHelper.comparePassword(user.password, password)) {
      throw new Error("Invalid email or password");
    }

    const token = EncryptHelper.generateToken({ id: user.id });

    return { message: "Login successful", user, token };
  }

  static async getProfile(userId: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { id: userId },
    });
    
    if (!user) {
      throw new Error("User not found");
    }

    return { ...user, password: undefined };
  }
}
