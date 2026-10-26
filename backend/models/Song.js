const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    artist: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true
    },

    genre: {
        type: String
    },

    mood: {
        type: String
    },

    album: {
        type: String
    },

    cover: {
        type: String
    },

    audioUrl: {
        type: String
    }
});

module.exports = mongoose.model("Song", songSchema);