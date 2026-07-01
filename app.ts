import "dotenv/config";

import express, { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import hbs from "hbs";

import indexRouter from "./routes";

const app = express();

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views", "partials"));

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
app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(createError(404));
});

// Error handler
app.use((err: HttpError, req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500);

    res.render("error", {
        status: err.status || 500,
        message: err.message,
        error: req.app.get("env") === "development" ? err : {},
    });
});

export default app;
