import * as express from "express";
import { BookController } from "../controllers/book.controllers";
import { authentication } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";

const router = express.Router();

router.get("/books", BookController.getAllBooks);
router.get("/books/:id", BookController.getBookById);
router.post("/books", BookController.createBook);

router.put(
  "/books/:id",
  authentication,
  authorization(["admin"]),
  BookController.updateBook
);
router.delete(
  "/books/:id",
  authentication,
  authorization(["admin"]),
  BookController.deleteBook
);
export { router as bookRouter };
