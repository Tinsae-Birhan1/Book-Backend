import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";

import { Order } from "./orderEntity";

@Entity({ name: "books" })
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  tags: string;

  @Column({ nullable: false })
  writer: string;

  @Column({ nullable: false })
  price: number;

  @Column()
  image: string;

  

  @OneToMany(() => Order, order => order.user)
    orders: Order[];
    

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
