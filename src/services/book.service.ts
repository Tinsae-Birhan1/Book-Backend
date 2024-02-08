import { AppDataSource } from "../data-source";
import { Book } from "../entity/Books.entity";
import * as cache from "memory-cache";

export class BookService {
  static async getAllBooks() {
    const data = cache.get("data");
    if (data) {
      console.log("serving from cache");
      return { data };
    } else {
      console.log("serving from db");
      const bookRepository = AppDataSource.getRepository(Book);
      const books = await bookRepository.find();
      cache.put("data", books, 10000);
      return { data: books };
    }
  }

  static async getBookById(id: string) {
    const bookRepository = AppDataSource.getRepository(Book);
    const book = await bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new Error("Book not found");
    }

    return { data: book };
  }

  static async createBook(title: string, tags: string, writer: string, price: number) {
    const book = new Book();
    book.title = title;
    book.tags = tags;
    book.writer = writer;
    book.price = price;
    book.image = 'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg';
    
    const bookRepository = AppDataSource.getRepository(Book);
    await bookRepository.save(book);

    return { message: "Book created successfully", book };
  }

  static async updateBook(id: string, title: string, tags: string, writer: string, price: number) {
    const bookRepository = AppDataSource.getRepository(Book);
    const book = await bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new Error("Book not found");
    }

    book.title = title;
    book.tags = tags;
    book.writer = writer;
    book.price = price;

    await bookRepository.save(book);

    return { message: "Book updated successfully", book };
  }

  static async deleteBook(id: string) {
    const bookRepository = AppDataSource.getRepository(Book);
    const book = await bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new Error("Book not found");
    }

    await bookRepository.remove(book);

    return { message: "Book deleted successfully" };
  }
}
