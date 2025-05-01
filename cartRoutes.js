const express = require("express");
const Cart = require("../models/Cart");
const auth = require("../middleware/authMiddleware"); // assuming you have this
const Product = require("../models/Product"); // ✅ Important
const User = require("../models/user"); // ✅ Important

const router = express.Router();

// Add product to cart
router.post("/add", auth, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user; // ✅ correct
  
    try {
      // Fetch product details
      const product = await Product.findById(productId);
      if (!product) return res.status(404).json({ msg: "Product not found" });
  
      // Fetch user details
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ msg: "User not found" });
  
      // Check if user already has a cart
      let cart = await Cart.findOne({ userId });
  
      if (cart) {
        // Cart exists
        const itemIndex = cart.products.findIndex(p => p.productId.toString() === productId);
  
        if (itemIndex > -1) {
          // Product exists, update quantity
          cart.products[itemIndex].quantity += quantity;
        } else {
          // New product
          cart.products.push({
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: quantity,
          });
        }
      } else {
        // No cart exists, create new
        cart = new Cart({
          userId,
          username: user.username,
          products: [{
            productId: product._id,
            name: product.name,
            price: product.price,
            quantity: quantity,
          }],
        });
      }
  
      await cart.save();
      res.status(200).json({ msg: "Product added to cart", cart });
  
    } catch (err) {
      console.error("Error adding to cart:", err);
      res.status(500).json({ msg: "Server error" });
    }
  });
  

// Get user's cart
router.get("/", auth, async (req, res) => {
    try {
      // Get the userId from the authentication token
      const  userId  = req.user; // Assuming userId is part of the token payload
  
      // Fetch the cart data using the logged-in user's userId
      const cart = await Cart.findOne({ userId }).populate("products.productId");
  
      if (!cart) return res.status(404).json({ msg: "Cart is empty" });
  
      // Return cart data
      res.status(200).json({ userId, cart });
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Server error" });
    }
  });

// Remove product from cart
// router.delete("/remove/:productId", auth, async (req, res) => {
//   const userId = req.user.userId;
//   const { productId } = req.params;

//   try {
//     let cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ msg: "Cart not found" });

//     cart.products = cart.products.filter(p => p.productId.toString() !== productId);
//     await cart.save();

//     res.status(200).json(cart);
//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });



router.delete("/remove/:productId", auth, async (req, res) => {
  const userId = req.user;  // Get user ID from JWT token
  const { productId } = req.params; // Get product ID from URL parameters
  console.log(userId)

  try {
    // Step 1: Find the user's cart
    let cart = await Cart.findOne({ userId });
    console.log(cart)
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });  // Cart not found for the user
    }

    // Step 2: Check if the product exists in the cart
    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex === -1) {
      return res.status(404).json({ msg: "Product not found in the cart" });  // Product not found in the cart
    }

    // Step 3: Remove the product from the cart
    cart.products.splice(productIndex, 1);

    // Step 4: Save the updated cart
    await cart.save();

    // Step 5: Return a success response with the updated cart
    res.status(200).json({ msg: "Product removed from cart", cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });  // Handle any errors
  }
});


module.exports = router;
