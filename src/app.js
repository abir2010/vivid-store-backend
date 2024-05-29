const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouters");

const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // maximum 5 requests
  message: "Too many requests from this address. Please try again later.",
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
app.use(xssClean());
app.use(rateLimiter);

// users router
app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);

app.get("/home", (req, res) => {
  res.json({ message: "server is running well" });
});

// client error handing middleware
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// server error handing middleware
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
});

module.exports = app;
