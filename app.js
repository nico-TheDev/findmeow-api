const express = require("express");
const morgan = require("morgan");

// ROUTE IMPORTS
const userRoutes = require("./routes/UserRoutes");

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(express.json());

app.use(userRoutes);

module.exports = app;
