const express = require ("express");
const router = express.Router ();
const Entry = require("../models/Entry")
const authMiddleware = require("../middleware/authMiddleware");


// Create entry
router.post("/create", authMiddleware, async (req, res) => {
    const { content, tag } = req.body;

    const entry = new Entry({ 
        content, 
        tag,
        user: req.user.email,
    });
    await entry.save();

    res.send("Entry saved");
});

// Get all entries
router.get("/all", authMiddleware, async (req, res) => {
    const entries = await Entry.find({ 
        user: req.user.email,
     }).sort({ createdAt: -1});

    res.json(entries);
}); 

//Delete Entry
router.delete("/delete/:id", authMiddleware, async (req, res) => {
    await Entry.findOneAndDelete({
        _id: req.params.id,
        user: req.user.email,
    });

    res.send("Entry deleted");
});

//Update entry
router.put("/update/:id", authMiddleware, async (req, res) => {
    const { content } = req.body;

    await Entry.findOneAndUpdate(
        {
            _id: req.params.id,
            user: req.user.email,
        },
        {
            content,
        }
    );

    req.send("Entry updated");
});


module.exports = router;