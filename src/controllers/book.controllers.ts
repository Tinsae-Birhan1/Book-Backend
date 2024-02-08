import { Request, Response } from "express";
import { BookService } from "../services/book.service";

export class BookController {
  static async getAllBooks(req: Request, res: Response) {
    try {
      const result = await BookService.getAllBooks();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getBookById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await BookService.getBookById(id);
      if (!result) {
        res.status(404).json({ message: "Book not found" });
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async createBook(req: Request, res: Response) {
    try {
      const { title, tags, writer, price } = req.body;
      const result = await BookService.createBook(title, tags, writer, price);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateBook(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, tags, writer, price } = req.body;
      const result = await BookService.updateBook(id, title, tags, writer, price);
      if (!result) {
        res.status(404).json({ message: "Book not found" });
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteBook(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await BookService.deleteBook(id);
      if (!result) {
        res.status(404).json({ message: "Book not found" });
      } else {
        res.status(200).json({ message: "Book deleted successfully" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
