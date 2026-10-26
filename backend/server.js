const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/songs");
const likeRoutes = require("./routes/likes");
const app = express();

const PORT = 5000;


/* MIDDLEWARE */

app.use(cors());

app.use(express.json());


/* DATABASE */

mongoose.connect("mongodb://127.0.0.1:27017/melora")
    .then(() => {

        console.log("MongoDB connected successfully");

    })
    .catch((error) => {

        console.log("MongoDB connection error:", error);

    });


/* ROUTES */

app.get("/test", (req, res) => {
    res.json({ message: "Test route works" });
});

app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/likes", likeRoutes);

/* HOME */

app.get("/", (req, res) => {

    res.json({
        message: "Welcome to Melora Backend 🎵"
    });

});


/* SERVER */

app.listen(PORT, () => {

    console.log(
        `Melora server running on http://localhost:${PORT}`
    );

});