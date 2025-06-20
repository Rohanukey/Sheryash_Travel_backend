
const express = require("express");
const app = express();
const port = process.env.Port || 5000;
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
    number: { type: String, required: true },       // mobile number (you can also use Number)
    time: { type: String, required: true },         // time as string like "10:30 AM"
    date: { type: Date, required: true },           // use Date here for real dates
}, { timestamps: true });


const User = mongoose.model("User", userSchema);


app.get("/", (req, res) => {
    res.send("hello from the server you created")
})

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


app.listen(port, () => {
    console.log(` Server is live on http://localhost:${port}`)
})