import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../repositories/user.repository";

export const authorization = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req["currentUser"].id;
      const user = await UserRepository.getUserById(userId);
      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
