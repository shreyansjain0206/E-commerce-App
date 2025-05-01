const express = require("express");
const mongoose = require("mongoose");//mongoose provide schema based solutions to work with MongoDB
const dotenv = require("dotenv"); //which loads environment variables from a .env file into process.env.
const authRoutes = require("./routes/auth");
const cors = require("cors");//Imports the CORS middleware, which allows the backend to accept requests from different origins  
const productRoutes = require('./routes/productRoutes');
const path = require("path");//Imports Node’s built-in path module to work with file and directory paths
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require("./routes/orderRoutes");


dotenv.config();//loading enf variables 
const app = express();//initializing express
app.use(cors()); // Enable CORS
app.use(express.json());//Middleware to parse incoming JSON requests (sets req.body)
app.use(express.static(path.join(__dirname, "public"))); //Serves static files (like HTML, JS, CSS) from the public directory, allowing you to host frontend files with the backend.



mongoose.connect(process.env.MONGO_URI)//Connects to a MongoDB database using the URI defined in .env. Logs success or error messages accordingly
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use("/api/orders", orderRoutes);



const PORT = process.env.PORT || 5000;//Sets the port for the server to run on, either from the environment variable or defaults to 5000.
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));//Starts the Express server and logs the port it’s running on.

// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const User = require('./models/user');

// const app = express();
// const PORT = 3000;

// // Connect to MongoDB
// // mongoose.connect('mongodb://localhost:27017/E-com', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// }).then(() => console.log('✅ MongoDB Connected'))
//   .catch(err => console.log('❌ MongoDB Error:', err));

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));

// // Serve HTML pages
// app.get('/register', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'register.html'));
// });

// app.get('/login', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'login.html'));
// });

// // Register User
// app.post('/register', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.send('User already exists! Please login.');
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password: hashedPassword });

//     await newUser.save();
//     res.send('Registration successful! <a href="/login">Login here</a>.');
//   } catch (err) {
//     res.status(500).send('Error registering user.');
//   }
// });

// // Login User
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user) return res.send('Invalid username or password.');

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.send('Invalid username or password.');

//     res.send(`Welcome back, ${username}!`);
//   } catch (err) {
//     res.status(500).send('Error logging in.');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });
