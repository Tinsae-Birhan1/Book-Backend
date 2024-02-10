import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";
import { Book } from "./Books.entity";

@Entity({name: "orders"})
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, user => user.orders)
    user: User;

  @Column()
  bookId: string;

 
  @ManyToOne(() => Book, book => book.orders)
  book: Book;

  @Column()
  points: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
