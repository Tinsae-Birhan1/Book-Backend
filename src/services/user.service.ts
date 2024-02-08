import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { EncryptHelper } from "../helpers/encrypt";
import * as cache from "memory-cache";

export class UserService {
  static async signup(name: string, email: string, password: string, role: string, points: number) {
    const encryptedPassword = await EncryptHelper.encryptPassword(password);
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = encryptedPassword;
    user.role = role;
    user.points = points;

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    const token = EncryptHelper.generateToken({ id: user.id });

    return { message: "User created successfully", token, user };
  }

  static async login(email: string, password: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = EncryptHelper.comparePassword(user.password, password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = EncryptHelper.generateToken({ id: user.id });

    return { message: "Login successful", token, user };
  }

  static async getUsers() {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return { data };
    } else {
      console.log("serving from db");
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();

      cache.put("data", users, 6000);
      return { data: users };
    }
  }

  static async updateUser(id: string, name: string, email: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
    user.name = name;
    user.email = email;
    await userRepository.save(user);
    return { message: "User updated successfully", user };
  }

  static async deleteUser(id: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not found");
    }
    await userRepository.remove(user);
    return { message: "User deleted successfully" };
  }
}
