const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User ({
        email, 
        password: hashedPassword,
    });

    await user.save();

    res.send("User registered");
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body; 

    const user = await User.findOne({ email });

    if (!user) return res.send ("User not found");

    const isMatch = await bcrypt.compare(password, user.password); 

    if (!isMatch) return res.send("Invalid credentials");



    const token = jwt.sign(
        {
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );

    res.json({
        token,
        email: user.email,
    });
});

module.exports = router;