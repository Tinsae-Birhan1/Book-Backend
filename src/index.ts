import * as express from "express";
import { AppDataSource } from "./data-source";
import { userRouter } from "./routes/user.routes";
import { bookRouter } from "./routes/book.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());

app.use("/auth", userRouter);
app.use("/api", bookRouter);

app.get("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

AppDataSource.initialize().then(() => {
  console.log("Database initialized");
});
