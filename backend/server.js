const express = require("express");
const cors = require("cors");
 
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const entryRoutes = require("./routes/entry");
app.use("/api/entries", entryRoutes);

const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.log(err));

console.log("MONGO_URI:", process.env.MONGO_URI);

