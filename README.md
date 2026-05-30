# 🛒 E-Commerce CRUD API with JWT Authentication & Local Storage

A robust and scalable backend REST API for an E-Commerce platform. This project handles secure user authentication, comprehensive product management (CRUD), and multiple image uploads using Multer with local disk storage. 

## 🚀 Tech Stack & Libraries

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Local & Atlas Cloud), Mongoose ODM
* **Authentication:** JSON Web Tokens (JWT)
* **File Uploads:** Multer (Disk Storage)
* **Validation:** express-validator

## 🚀 Features

### 🔐 Authentication & Security
* JWT Access Token generation
* Bearer Token authorization via HTTP Headers
* Protected application routes

### 📦 Product Management
* Create Product (with multiple images)
* Get All Products (with category filtering)
* Get Product By ID
* Update Product details
* Delete Product

### 📁 File Storage
* Image Upload using Multer
* Multiple Images Upload support (up to 5 per product)
* Local disk storage optimization

---

## 🗄️ Database Architecture & Flow

This API relies on **MongoDB** as its primary NoSQL database, managed through the **Mongoose ODM** (Object Data Modeling) library for strict schema validation.

```text
[ Client Request ] 
       │
[ Express Controllers ] ──(Passes raw data)
       │         
       ▼
[ Mongoose Models ] ──(Applies strict Schema, checks Required fields, Types)
       │
       ▼
[ MongoDB Database ] ──(Saves Document & Returns Success/Error)
  (Local / Atlas)

```

### 🌍 Database Connection Support

The project is configured to support both local development and cloud deployment seamlessly:

1. **Local MongoDB:** Ideal for offline development (e.g., `mongodb://localhost:27017/ecommerce_db`).
2. **MongoDB Atlas:** Ready for production cloud clusters (e.g., `mongodb+srv://<username>:<password>@cluster0...`).

---

## 🔐 Authentication Flow

```text
      [ Client Request ]
              │
              ▼
      Provide Credentials
              │
              ▼
   Generate JWT Access Token
              │
              ▼
   Send Token to Client
              │
              ▼
 Client Stores Token (Local/Session)
              │
              ▼
  Attach to Auth Header (Bearer)
              │
              ▼
    Access Protected Routes

```

---

## 📂 Folder Structure

```text
E-Commerce/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection & error handling logic
│   ├── controllers/
│   │   └── productController.js  # CRUD operations & business logic
│   ├── middleware/
│   │   ├── authMiddleware.js     # Protects routes via JWT validation
│   │   └── uploadMiddleware.js   # Multer local disk configuration
│   ├── models/
│   │   └── Product.js            # Mongoose Product schema
│   ├── routes/
│   │   └── productRoutes.js      # API endpoint routing
│   ├── utils/
│   │   └── validators.js         # express-validator rules
│   └── app.js                    # Express app initialization
├── uploads/                      # Local directory for stored images
├── .env                          # Environment variables
├── package.json                  # Project dependencies
└── server.js                     # Entry point of the application

```

---

## 📡 API Endpoints

### 📦 Product & File Routes (`/products`)

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `GET` | `/products` | Fetch all products (supports `?category=` filter) | Public |
| `GET` | `/products/:id` | Fetch specific product details by its ID | Public |
| `POST` | `/products` | Create a product (Uploads max 5 images) | Protected |
| `PUT` | `/products/:id` | Update product text details | Protected |
| `DELETE` | `/products/:id` | Delete product from database | Protected |

---

## 🛠️ Installation and Setup

Follow these steps to run the project locally:

**1. Clone the repository:**

```bash
git clone <your-github-repo-url>
cd E-Commerce

```

**2. Install Dependencies:**

```bash
npm install

```

**3. Setup Local Storage:**
Create the folder where Multer will save images:

```bash
mkdir uploads

```

**4. Set up Environment Variables:** Create a `.env` file in the root directory and add your configurations. Choose the database URI that fits your setup:

```env
PORT=5000

# Choose ONE of the following MongoDB URIs:
# For Local MongoDB (Compass):
MONGO_URI=mongodb://localhost:27017/ecommerce_db
# For Cloud MongoDB (Atlas):
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ecommerce_db

JWT_SECRET=your_jwt_access_secret

```

**5. Start the Server:**

```bash
npm run dev

```

---

## 👨‍💻 Author Notes

Created by: Snehal Solanke 🎯

This API represents a clean, modular approach to backend architecture, focusing on solid REST principles, robust database validation via Mongoose, and structured data flow.

## 🤝 Let's Connect & Collaborate!

If you found this project helpful or interesting, I'd love to hear from you! Whether you want to:
💡 Share ideas and suggestions
🐛 Report issues or improvements
💬 Discuss backend development practices
🚀 Work together on exciting initiatives
