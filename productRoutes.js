const express = require("express");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");

const router = express.Router();//Creates a new instance of an Express router to define routes specific to products.

// GET all products (user must be logged in)
router.get("/", auth, async (req, res) => { 
  try {//Tries to retrieve all products from the database using Product.find(). If successful, sends them as JSON.
    const products = await Product.find();
    res.json(products);
  } catch (err) {//error 500 if there is a n DB issue 
    res.status(500).json({ msg: "Server error" });
  }
});

// GET single product by ID or name (user must be logged in)
router.get("/search", auth, async (req, res) => {
  const { id, name } = req.query;
//Defines a route at /api/products/search. Expects query parameters id or name. Requires authentication via auth middleware.
  try {
    let product;

    if (id) {
      product = await Product.findById(id);//if id is provided then it fetches from mongodb_id
    } else if (name) {
      product = await Product.findOne({ name: new RegExp(name, "i") }); //  if name is provided it  case-insensitive search using RegExp
    } else {
      return res.status(400).json({ msg: "Provide either 'id' or 'name' as query parameter" });//else return status code 400 if id or name not provided 
    }

    if (!product) return res.status(404).json({ msg: "Product not found" });//when product is not found

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });//when db or server error 
  }
});

module.exports = router;
//Exports this router so it can be mounted in your main app (app.use('/api/products', productRoutes);).

