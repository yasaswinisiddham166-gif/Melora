const express = require("express");
const mongoose = require("mongoose");

const Like = require("../models/Like");
const User = require("../models/User");
const Song = require("../models/Song");

const router = express.Router();


/* =========================================
   LIKE / UNLIKE SONG
========================================= */

router.post("/", async (req, res) => {

    try {

        const { userId, songId } = req.body;

        console.log("LIKE REQUEST:", {
            userId,
            songId
        });


        /* CHECK DATA */

        if (!userId || !songId) {

            return res.status(400).json({
                message: "User ID and Song ID are required"
            });

        }


        /* CHECK OBJECT IDs */

        if (
            !mongoose.Types.ObjectId.isValid(userId) ||
            !mongoose.Types.ObjectId.isValid(songId)
        ) {

            return res.status(400).json({
                message: "Invalid User ID or Song ID"
            });

        }


        /* CHECK USER */

        const user = await User.findById(userId);

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        /* CHECK SONG */

        const song = await Song.findById(songId);

        if (!song) {

            return res.status(404).json({
                message: "Song not found"
            });

        }


        /* CHECK EXISTING LIKE */

        const existingLike =
            await Like.findOne({
                userId: userId,
                songId: songId
            });


        /* UNLIKE */

        if (existingLike) {

            await Like.deleteOne({
                _id: existingLike._id
            });

            console.log("Song unliked");

            return res.json({
                message: "Song unliked"
            });

        }


        /* LIKE */

        const newLike =
            new Like({
                userId: userId,
                songId: songId
            });


        await newLike.save();

        console.log("Song liked");

        return res.json({
            message: "Song liked"
        });


    } catch (error) {

        console.error(
            "LIKE ERROR:",
            error
        );

        return res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }

});


/* =========================================
   GET USER LIKED SONGS
========================================= */

router.get("/:userId", async (req, res) => {

    try {

        const userId =
            req.params.userId;


        if (
            !mongoose.Types.ObjectId.isValid(
                userId
            )
        ) {

            return res.status(400).json({
                message: "Invalid User ID"
            });

        }


        const likes =
            await Like.find({
                userId: userId
            })
            .populate("songId");


        return res.json(likes);


    } catch (error) {

        console.error(
            "GET LIKES ERROR:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });

    }

});


module.exports = router;