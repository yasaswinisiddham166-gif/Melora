const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();


/* =========================
   REGISTER
========================= */

router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;


        if (!name || !email || !password) {

            return res.status(400).json({
                message: "All fields are required"
            });

        }


        const existingUser =
            await User.findOne({ email });


        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }


        const hashedPassword =
            await bcrypt.hash(password, 10);


        const newUser = new User({

            name: name,

            email: email,

            password: hashedPassword

        });


        await newUser.save();


        res.status(201).json({

            message: "Account created successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            message: "Server error"

        });

    }

});


/* =========================
   LOGIN
========================= */

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;


        const user =
            await User.findOne({ email });


        if (!user) {

            return res.status(400).json({

                message: "Invalid email or password"

            });

        }


        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(400).json({

                message: "Invalid email or password"

            });

        }


        res.json({

            message: "Login successful",

            user: {

                id: user._id,

                name: user.name,

                email: user.email

            }

        });

    }

    catch (error) {

        res.status(500).json({

            message: "Server error"

        });

    }

});


module.exports = router;