# 🛒 ShopSmart — Full-Stack Online Grocery Store

ShopSmart is a full-stack e-commerce grocery web application that allows users to browse products, manage a shopping cart, and place orders online.
The platform also provides an admin dashboard for inventory and order management.

This project demonstrates real-world full-stack development including authentication, REST API design, database integration, and role-based access control.

---

## 🚀 Features

### User Features

* User Registration & Login (JWT Authentication)
* Browse grocery products
* Product search and filtering
* Add/remove items from cart
* Place orders
* View order history
* Responsive UI

### Admin Features

* Add new products
* Update product details
* Delete products
* Manage users
* View and process orders
* Inventory management

---

## 🧱 Tech Stack

**Frontend**

* Angular
* HTML5
* CSS3
* TypeScript
* Bootstrap

**Backend**

* Node.js
* Express.js
* RESTful APIs

**Database**

* MongoDB Atlas (Cloud Database)
* Mongoose ODM

**Authentication & Security**

* JSON Web Token (JWT)
* Password hashing (bcrypt)
* Protected routes (role-based authorization)

**Tools**

* Git & GitHub
* Postman
* VS Code

---

## 🏗️ System Architecture

The application follows a 3-tier architecture:

1. **Client Layer (Angular Frontend)**
   Handles user interface and user interactions.

2. **Server Layer (Node.js + Express)**
   Processes requests, authentication, and business logic.

3. **Database Layer (MongoDB Atlas)**
   Stores users, products, carts, and orders.

**Flow:**

User → Angular UI → REST API → Express Server → MongoDB → Response → UI

---

## 🔐 Authentication

* JWT-based login system
* Passwords hashed using bcrypt
* Role-based authorization (Admin/User)
* Protected API endpoints

---

## 📂 Database Collections

### Users

* name
* email
* password (hashed)
* role
* address

### Products

* product name
* description
* category
* price
* stock quantity
* image URL

### Orders

* userId
* products list
* total amount
* payment status
* order status
* order date

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Bharath136/grocery-webapp
cd grocery-webapp
```

---

### 2. Install backend dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```
PORT=5100
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=shopsmartsecret
```

> The project uses MongoDB Atlas cloud database.

---

### 4. Run Backend Server

```bash
npm start
```

or

```bash
npm run dev
```

Server runs at:

```
http://localhost:5100
```

---

### 5. Setup Frontend

```bash
cd client
npm install
ng serve
```

Open browser:

```
http://localhost:4200
```

---

## 📡 API Endpoints

### Authentication

* `POST /api/register`
* `POST /api/login`

### Products

* `GET /api/products`
* `GET /api/products/:id`
* `POST /api/products` (Admin)
* `PUT /api/products/:id` (Admin)
* `DELETE /api/products/:id` (Admin)

### Cart

* `POST /api/cart/add`
* `POST /api/cart/remove`
* `GET /api/cart`

### Orders

* `POST /api/orders`
* `GET /api/orders/user`
* `GET /api/orders/admin`

---

## 🛡️ Security Measures

* Password hashing using bcrypt
* JWT authentication
* Input validation
* Protected admin routes
* Environment variable configuration

---

## 📈 Future Improvements

* Online payment integration (Razorpay/Stripe)
* Email notifications
* Product recommendations
* Order tracking
* Deployment (AWS / Docker)

---


## 🧠 What I Learned

* Building REST APIs using Node.js & Express
* Connecting backend with MongoDB Atlas
* Implementing authentication and authorization
* Full-stack application architecture
* Environment configuration and debugging

---
