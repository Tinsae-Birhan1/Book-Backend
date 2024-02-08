import { AppDataSource } from "../data-source";
import { Book } from "../entity/Books.entity";

export class BookRepository {
  static async getAllBooks() {
    const bookRepository = AppDataSource.getRepository(Book);
    return await bookRepository.find();
  }

  static async getBookById(id: string) {
    const bookRepository = AppDataSource.getRepository(Book);
    return await bookRepository.findOne({ where: { id } });
  }

  static async createBook(bookData: Partial<Book>) {
    const bookRepository = AppDataSource.getRepository(Book);
    const book = bookRepository.create(bookData);
    return await bookRepository.save(book);
  }

  static async updateBook(id: string, bookData: Partial<Book>) {
    const bookRepository = AppDataSource.getRepository(Book);
    await bookRepository.update(id, bookData);
    return await bookRepository.findOne({ where: { id } });
  }

  static async deleteBook(id: string) {
    const bookRepository = AppDataSource.getRepository(Book);
    const book = await bookRepository.findOne({ where: { id } });
    if (!book) throw new Error("Book not found");
    await bookRepository.remove(book);
    return book;
  }
}
