import * as express from "express";
import { authentification } from "../middleware/authentification";
import { BookController } from "../controllers/book.controllers";
import { authorization } from "../middleware/authorization";

const Router = express.Router();

Router.get("/books", BookController.getAllBooks);
Router.post("/books", BookController.createBook);

Router.put(
  "/books/:id",
  authentification,
  authorization(["admin"]),
  BookController.updateBook
);
Router.delete(
  "/books/:id",
  authentification,
  authorization(["admin"]),
  BookController.deleteBook
);
export { Router as bookRouter };
