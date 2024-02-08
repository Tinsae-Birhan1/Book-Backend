import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import { UserRepository } from "../repositories/user.repository";

dotenv.config();
const { JWT_SECRET = "" } = process.env;

export class EncryptHelper {
  static async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  static comparePassword(hashPassword: string, password: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(payload: { id: string }): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}
