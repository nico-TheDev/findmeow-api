const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// ROUTE IMPORTS
const userRoutes = require("./routes/UserRoutes");
const postRoutes = require("./routes/PostRoutes");

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/public", express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.use(userRoutes);
app.use(postRoutes);

module.exports = app;
