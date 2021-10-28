const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// ROUTE IMPORTS
const userRoutes = require("./routes/UserRoutes");

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

app.use(userRoutes);

module.exports = app;
