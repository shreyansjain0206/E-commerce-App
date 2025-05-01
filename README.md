# E-commerce-App (Node.js + Express + MongoDB)
This is a backend API for a simple e-commerce application, built with **Node.js**, **Express**, and **MongoDB**. It handles user registration, login with JWT authentication, cart management, and order placement.

---

## 🚀 Features

- User registration and login with secure password hashing (bcrypt)
- JWT-based authentication middleware
- Add, remove, and view products in a user's cart
- Place orders based on the user's cart
- Fetch user's order history
- MongoDB for data persistence with Mongoose ORM

---

## 📁 Folder Structure
project-root/ ├── models/ │ ├── User.js │ ├── Cart.js │ └── Order.js ├── middleware/ │ └── authMiddleware.js ├── routes/ │ ├── authRoutes.js │ ├── cartRoutes.js │ └── orderRoutes.js ├── .env ├── server.js └── README.md
. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ecommerce-app.git
   cd ecommerce-app
npm install

npm run dev

Authorization: <your_token_here>

📦 API Endpoints
Auth
POST /api/auth/register – Register new user

POST /api/auth/login – Login and get JWT

POST /api/auth/logout – Logout (client-side token removal)

Cart
POST /api/cart/add – Add product to cart

GET /api/cart/ – Get current cart

DELETE /api/cart/remove/:productId – Remove product from cart

Orders
POST /api/orders/ – Place an order

GET /api/orders/ – Get all orders of the user

{
  "_id": "abc123",
  "name": "Wireless Mouse",
  "price": 499,
  "description": "Ergonomic mouse",
  "stock": 50
}

📌 Tech Stack
Node.js

Express

MongoDB with Mongoose

JWT (jsonwebtoken)

bcryptjs

dotenv

nodemon (for development)

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

