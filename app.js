require("dotenv").config();

const express = require("express");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const hbs = require("express-handlebars");

const indexRouter = require("./routes");

const app = express();

// View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.engine(
    "hbs",
    hbs.engine({
        extname: "hbs",
        defaultView: "main",
        layoutsDir: path.join(__dirname, "views"),
    })
);

// Middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);

// 404
app.use((req, res, next) => {
    next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.render("error", {
        message: err.message,
        error: req.app.get("env") === "development" ? err : {},
    });
});

module.exports = app;