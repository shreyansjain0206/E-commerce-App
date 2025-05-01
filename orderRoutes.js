// routes/orderRoutes.js
const express = require("express");
const auth = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const router = express.Router();

// Create order from cart
router.post("/", auth, async (req, res) => {
  const userId = req.user; //auth middleware injects req.user

  try {
    const cart = await Cart.findOne({ userId });//getting userid 
    if (!cart || cart.products.length === 0) {//if there is not cart or the in cart products are 0 means empty 
      return res.status(400).json({ msg: "Cart is empty" });//if its empty 
    }

    const totalAmount = cart.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );//Calculates the total price of the order by summing price × quantity for each cart item.

    const order = new Order({
      userId,
      products: cart.products,
      totalAmount,
    });//from cart AND CREATE  a new schema order and save item from cart tt order 

    await order.save();

    // Clear the user's cart after placing order
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ msg: "Order placed successfully", order });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all orders of the user
router.get("/", auth, async (req, res) => {
  const userId = req.user;
  try {
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });//sort the order list in  descending order of creation means item that was created at last will be shown at top 
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
