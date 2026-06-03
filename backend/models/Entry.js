const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({

    content: String, 
    
    user: String, 

    tag: {
        type: String, 
        default: "Personal",
    },

    createdAt: {
        type: Date, 
        default: Date.now,
    },
});

module.exports = mongoose.model("Entry", entrySchema);