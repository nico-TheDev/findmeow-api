const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// ROUTE IMPORTS
const userRoutes = require("./routes/UserRoutes");
const postRoutes = require("./routes/PostRoutes");
const uploadController = require("./controller/UploadController");

const app = express();

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/public", express.static("public"));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.use(userRoutes);
app.use(postRoutes);
app.post("/api/upload", uploadController.upload_img_post);

module.exports = app;
