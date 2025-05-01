const express = require("express");
const bcrypt = require("bcryptjs");//Imports bcryptjs, a library used to hash passwords securely.
const jwt = require("jsonwebtoken");// Imports jsonwebtoken, used to generate JWT tokens for user authentication.
const User = require("../models/user");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const salt = await bcrypt.genSalt(10);//This line is using the bcryptjs library to generate a salt, which is a random string added to passwords before hashing.
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hashedPassword });//Creates a new user instance with the hashed password.
    await user.save();//Saves the user to the MongoDB database.

    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   console.log("Received registration:", { username, password }); // Log incoming data

//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       console.log("User already exists");
//       return res.status(400).json({ msg: "User already exists" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = new User({ username, password: hashedPassword });
//     await user.save();

//     console.log("User created successfully:", user.username);
//     res.status(201).json({ msg: "User created successfully" });
//   } catch (err) {
//     console.error("Register error:", err.message);
//     res.status(500).json({ msg: "Server error", error: err.message });
//   }
// });


// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);//Compares entered password with hashed password in the DB.
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
// Signs a JWT with the user's ID, using a secret stored in environment variables, valid for 1 hour.


    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


router.post('/logout', (req, res) => {
  // Just a placeholder – logout is handled on client by clearing token
  res.json({ msg: 'Logged out successfully (client-side token cleared)' });
});


module.exports = router;
