
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");

//middleware
app.use(cors());

//this line is important to parse(change) JSON from frontend
app.use(express.json());

// connect to mongodb database
require('dotenv').config(); // add this line at top

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ MongoDB error:', err));



// schema for mongo data base

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },         // name like "Rohan"
    pickup: { type: String, required: true },       // pickup location
    destination: { type: String, required: true },  // destination location
    number: { type: Number, required: true },       // mobile number (you can also use Number)
    time: { type: String, required: true },         // time as string like "10:30 AM"
    date: { type: Date, required: true },           // use Date here for real dates
}, { timestamps: true });

const userSchema2 = new mongoose.Schema({
    name: { type: String, required: true },         // name like "Rohan"
    email: { type: String, required: true },       // pickup location
    number: { type: Number, required: true },  // destination location
    password: { type: String, required: true },       // mobile number (you can also use Number)
}, { timestamps: true });


const User = mongoose.model("User", userSchema);
const Userdata = mongoose.model("Userdata", userSchema2);


app.get("/", (req, res) => {
    res.send("hello from the server you created")
})
// backend/index.js
app.get("/api/users", async (req, res) => {
    try {
        const data = await User.find(); // MongoDB example
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch" });
    }
});
app.get("/api/userdata", async (req, res) => {
    try {
        const data = await Userdata.find(); // MongoDB example
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch" });
    }
});



// Post user data 
app.post("/api/users", async (req , res) => {
  try {
    const newUser = new User(req.body); // ✅ convert body to mongoose model
    await newUser.save();               // ✅ save to MongoDB

    res.status(201).json({
      message: "User data has been saved",
      user: newUser
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to save user", error: err.message });
  }
});

app.post("/api/userdata", async (req , res) => {
  try {
    const newUser = new Userdata(req.body); // ✅ convert body to mongoose model
    await newUser.save();               // ✅ save to MongoDB

    res.status(201).json({
      message: "User data has been saved",
      user: newUser
    });
  } catch (err) {
    res.status(500).json({ message: "❌ Failed to save user", error: err.message });
  }
});


app.listen(port, () => {
    console.log(` Server is live on http://localhost:${port}`)
})