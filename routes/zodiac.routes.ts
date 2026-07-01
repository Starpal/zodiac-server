import express, { Request, Response } from "express";
import ZodiacSymbol from "../models/zodiacSymbol";

const router = express.Router();

// Health check
router.get("/", async (_req: Request, res: Response) => {
    res.json({
        status: "ok",
        module: "zodiac",
        message: "Zodiac routes are alive 🪐",
    });
});

// GET random degree
router.get("/degree", async (_req: Request, res: Response) => {
    try {
        const response = await ZodiacSymbol.aggregate([{ $sample: { size: 1 } }]);

        return res.json(response[0] || null);
    } catch (error) {
        const err = error as Error;
        console.error("Error while getting random degree:", err.message);

        return res.status(500).json({
            error: "Failed to fetch random degree",
        });
    }
});

// POST by sign + degree
router.post("/DBdegree", async (req: Request, res: Response) => {
    try {
        const { sign, degree } = req.body as { sign?: string; degree?: number };

        if (!sign || degree === undefined) {
            return res.status(400).json({
                error: "Missing sign or degree",
            });
        }

        const response = await ZodiacSymbol.findOne({
            sign,
            degree,
        });

        if (!response) {
            return res.status(404).json({
                error: "No matching zodiac symbol found",
            });
        }

        return res.json(response);
    } catch (error) {
        const err = error as Error;
        console.error("Error while fetching DB degree:", err.message);

        return res.status(500).json({
            error: "Database query failed",
        });
    }
});

export default router;
