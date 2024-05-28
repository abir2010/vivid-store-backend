import chalk from "chalk";
import cors from "cors";
import express from "express";
import morgan from "morgan";

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(chalk.blue(`server is running at http://localhost:${port}`));
  //   await connectDB();
});

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.json({ message: "server is running well" });
});

// error handing middleware
app.use((req, res, next) => {
  return res.status(404).send({
    success: false,
    message: "Route not found",
  });
});

// error handing middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(200).send({
    success: false,
    message: err.message,
  });
});
