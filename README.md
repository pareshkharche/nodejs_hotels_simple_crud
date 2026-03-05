# 📌 Hotel Management API (Node.js, Express, MongoDB & Mongoose)

A simple REST API for a hotel management system that supports full **CRUD** (Create, Read, Update, Delete) for:

✔ Hotel Staff (Person) &nbsp; ✔ Menu Items (MenuItem)

APIs were tested using **Postman**, and database data can be inspected using **MongoDB Compass** (local) or **MongoDB Atlas** (cloud).

---

## 📁 Project Structure

```
Day5Github/
│
├── dbconnection/
│   ├── db.js               → MongoDB connection setup using Mongoose
│   └── server.js           → Express app, middleware, and route mounting
│
├── models/
│   ├── Person.js           → Schema/model for hotel staff
│   └── MenuItem.js         → Schema/model for menu items
│
└── routes/
    ├── personRoutes.js     → CRUD routes for /person
    └── menuItemRoutes.js   → CRUD routes for /menu

.env                        ← Environment variables (DB connection strings)
.gitignore
package.json
```

---

## 🚀 Features

- Connection to local MongoDB or MongoDB Atlas using environment variables
- Express routing with modular route files
- Full CRUD (POST, GET, PUT, DELETE)
- Query filters for specific fields
- Async/await for clean asynchronous code

---

## 🛠️ Setup & Installation

### 1. Install Dependencies

```bash
npm install
```

This installs required packages: Express, Mongoose, Dotenv, etc.

---

### 2. Configure `.env` File ⚠️ Important

Create a file named `.env` in the **project root** (same folder as `package.json`) and add one of the following depending on your setup:

#### 🟡 Local MongoDB

```env
MONGODB_URL_LOCAL=mongodb://<your_host>:<your_port>/hotels
```

> Replace `hotels` with your database name if needed.

#### 🟢 MongoDB Atlas (Cloud)

1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist your IP and create a database user
3. Copy your connection string and paste it below:

```env
MONGODB_URL_ATLAS=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myDatabase?retryWrites=true&w=majority
```

> Replace `<username>`, `<password>`, and `myDatabase` with your actual credentials.

---

### 3. Run the Server

```bash
node dbconnection/server.js
```

The API will be available at:

```
http://localhost:3000
```

---

## 🧪 API Endpoints

### 📍 Person (Hotel Staff)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/person` | Add a new staff member |
| GET | `/person` | Get all staff |
| GET | `/person/:workType` | Filter by role: `chef`, `waiter`, `manager` |
| PUT | `/person/:id` | Update staff by ID |
| DELETE | `/person/:id` | Remove staff by ID |

**Example — POST `/person`**

```json
{
  "name": "Amit Shah",
  "age": 28,
  "work": "chef",
  "mobile": "9876543210",
  "email": "amit@hotel.com",
  "address": "Mumbai",
  "salary": 35000
}
```

---

### 📍 Menu Items

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/menu` | Add a new menu item |
| GET | `/menu` | Get all menu items |
| GET | `/menu/:taste` | Filter by taste: `Sweet`, `Spicy`, `Sour` |
| PUT | `/menu/:id` | Update a menu item by ID |
| DELETE | `/menu/:id` | Remove a menu item by ID |

**Example — POST `/menu`**

```json
{
  "name": "Paneer Tikka",
  "price": 250,
  "taste": "Spicy",
  "is_drink": false,
  "ingredients": ["paneer", "spices", "yogurt"],
  "num_sales": 0
}
```

---

## 🧠 Concepts Covered

- Connecting Node.js with MongoDB using `dotenv` and Mongoose
- Schema definitions with required fields, enums, and defaults
- Organizing routes using `express.Router()`
- Handling async database operations using `async/await`
- Filtering queries based on URL parameters

---

## 📝 Notes

- Make sure `.env` is listed in `.gitignore` so your credentials are **never pushed to GitHub**
- To switch between local and Atlas DB, just update the connection variable used in `db.js`
