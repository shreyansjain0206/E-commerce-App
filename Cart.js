const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
  },
  username: {
    type: String,
    required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      name: String, // ✅ add product name here
      price: Number, // ✅ add price here
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
