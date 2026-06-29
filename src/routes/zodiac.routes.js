const express = require("express");
const router = express.Router();

const ZodiacSymbol = require("../models/zodiacSymbol.model");

// Health check
router.get("/", async (req, res) => {
    res.json({
        status: "ok",
        module: "zodiac",
        message: "Zodiac routes are alive 🪐",
    });
});

// GET random degree
router.get("/degree", async (req, res) => {
    try {
        const response = await ZodiacSymbol.aggregate([
            { $sample: { size: 1 } },
        ]);

        return res.json(response[0] || null);
    } catch (error) {
        console.error(
            "Error while getting random degree:",
            error.message
        );

        return res.status(500).json({
            error: "Failed to fetch random degree",
        });
    }
});

// POST by sign + degree
router.post("/db-degree", async (req, res) => {
    try {
        const { sign, degree } = req.body;

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
        console.error(
            "Error while fetching DB degree:",
            error.message
        );

        return res.status(500).json({
            error: "Database query failed",
        });
    }
});

module.exports = router;