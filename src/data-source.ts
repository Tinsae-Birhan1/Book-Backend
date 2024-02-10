import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { User } from "./entity/User.entity";
import { Book } from "./entity/Books.entity";
import { Order } from "./entity/orderEntity";

dotenv.config();

const { DB_URL, NODE_ENV } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  url: DB_URL,
  synchronize: NODE_ENV === "dev" ? false : false,
  logging: NODE_ENV === "dev" ? false : false,
  entities: [User, Book, Order],
  migrations: [__dirname + "/migration/*.ts"],
  subscribers: [],
});
