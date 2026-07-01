import express from "express";

import zodiacRoutes from "./zodiac.routes";
import uploadRoutes from "./upload.routes";

const router = express.Router();

// mount delle feature
router.use("/", zodiacRoutes);
router.use("/upload", uploadRoutes);

export default router;