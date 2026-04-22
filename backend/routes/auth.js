const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

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

    res.send("Login successfull");
});

module.exports = router;