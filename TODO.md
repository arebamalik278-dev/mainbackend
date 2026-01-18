# Backend API Development Plan

## Project Overview
Build a Node.js Express API with MongoDB/Mongoose featuring:
- JWT-based role authentication (Admin/Customer)
- Email services with Nodemailer
- Complete CRUD operations for products and orders
- OTP-based authentication system

## Folder Structure
```
/home/devil/backend/
├── src/
│   ├── config/
│   │   ├── db.js (MongoDB connection)
│   │   └── email.js (Nodemailer config)
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   └── OTP.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── orderController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── adminRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   └── utils/
│       ├── emailHelper.js
│       └── otpGenerator.js
├── .env
├── package.json
└── server.js
```

## Implementation Steps

### Step 1: Project Setup
- [x] Create package.json with dependencies
- [x] Create .env configuration file
- [x] Set up MongoDB connection config
- [x] Configure Nodemailer

### Step 2: Mongoose Models
- [x] Create User model (name, email, password, role, phone)
- [x] Create Product model (name, description, price, inventory, category)
- [x] Create Order model (user, products, total, status, shippingAddress)
- [x] Create OTP model (email, otp, expiresAt)

### Step 3: Authentication Logic
- [x] Implement send-otp endpoint (generate 6-digit OTP, save with expiry, send email)
- [x] Implement register endpoint (create user, generate JWT with role)
- [x] Implement login endpoint (validate credentials, generate JWT)
- [x] Create auth middleware (verify JWT token)
- [x] Create isAdmin middleware (check admin role)

### Step 4: Product Logic
- [x] Create product (Admin only)
- [x] Get products with search and pagination (Public)
- [x] Update product (Admin only)
- [x] Delete product (Admin only)

### Step 5: Order & Notification Logic
- [x] Create order (Customer)
- [x] Save order to database
- [x] Send Admin notification email
- [x] Send Customer confirmation email
- [x] Implement order controller with notification logic

### Step 6: Server Setup
- [x] Create main server.js file
- [x] Connect to MongoDB
- [x] Register all routes
- [x] Start the server

## Installation & Running

```bash
# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your MongoDB URI and email credentials

# Start the server
npm run dev

# Server will run on http://localhost:5000
```

## API Endpoints

### Authentication
- POST /api/auth/send-otp - Send OTP for verification
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Products (Public)
- GET /api/products - Get all products with search & pagination
- GET /api/products/:id - Get single product

### Products (Admin)
- POST /api/admin/products - Create product
- PUT /api/admin/products/:id - Update product
- DELETE /api/admin/products/:id - Delete product
- PUT /api/admin/products/:id/inventory - Update inventory

### Orders (Customer)
- POST /api/orders - Create order
- GET /api/orders - Get my orders
- GET /api/orders/:id - Get single order
- PUT /api/orders/:id/cancel - Cancel order

### Orders (Admin)
- GET /api/admin/orders - Get all orders
- PUT /api/admin/orders/:id/status - Update order status

## Key Features
- JWT authentication with role-based access
- OTP verification with 5-minute expiry
- Email notifications for orders
- Product search and pagination
- Admin-only product management
- Customer order placement

## Dependencies
- express
- mongoose
- jsonwebtoken
- bcryptjs
- nodemailer
- dotenv
- cors

