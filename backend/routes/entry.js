const express = require ("express");
const router = express.Router ();
const Entry = require("../models/Entry")


// Create entry
router.post("/create", async (req, res) => {
    const { content, user } = req.body;

    const entry = new Entry({ content, user });
    await entry.save();

    res.send("Entry saved");
});

// Get all entries
router.get("/all", async (req, res) => {
    const entries = await Entry.find().sort({ createdAt: -1 });
    res.json(entries);
}); 

module.exports = router;