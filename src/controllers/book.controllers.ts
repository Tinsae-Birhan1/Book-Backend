import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Book } from "../entity/Books.entity";

export class BookController {
  static async getAllBooks(req: Request, res: Response) {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        data,
      });
    } else {
      console.log("serving from db");
      const bookRepository = AppDataSource.getRepository(Book);
      const books = await bookRepository.find();
      cache.put("data", books, 10000);
      return res.status(200).json({
        data: books,
      });
    }
  }
  static async createBook(req: Request, res: Response) {
    const { title, description, author, year } =
      req.body;
    const book = new Book();
    book.title = title;
    book.description = description;
    book.author = author;
    book.year = year;
    book.image = 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg';
    const bookRepository = AppDataSource.getRepository(Book);
    await bookRepository.save(book);
    return res
      .status(200)
      .json({ message: "book created successfully", book });
  }

  static async updateBook(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, author, year, image } =
      req.body;
    const bookRepository = AppDataSource.getRepository(Book);
    const book = await bookRepository.findOne({
      where: { id },
    });
    book.title = title;
    book.description = description;
    book.author = author;
    book.year = year;
    book.image = image;
    await bookRepository.save(book);
    return res
      .status(200)
      .json({ message: "book updated successfully", book });
  }

  static async deleteBook(req: Request, res: Response) {
    const { id } = req.params;
    const bookRepository = AppDataSource.getRepository(Book);
    const book = await bookRepository.findOne({
      where: { id },
    });
    await bookRepository.remove(book);
    return res
      .status(200)
      .json({ message: "book deleted successfully", book });
  }
}
