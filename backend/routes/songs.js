const express = require("express");
const Song = require("../models/Song");

const router = express.Router();

// Get all songs
router.get("/", async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching songs"
        });
    }
});

module.exports = router;