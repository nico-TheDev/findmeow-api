const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// ROUTE IMPORTS
const userRoutes = require("./routes/UserRoutes");
const postRoutes = require("./routes/PostRoutes");

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

const dir = path.join(__dirname, "public");

app.use(express.static(dir));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.use(userRoutes);
app.use(postRoutes);

module.exports = app;
