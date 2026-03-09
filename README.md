# 🏨 Hotel Management API

A REST API for a hotel management system built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**.

Supports full **CRUD** operations for Hotel Staff and Menu Items, with **Passport.js authentication** and **bcrypt password hashing** for secure access.

APIs tested using **Postman** | Database inspected via **MongoDB Compass** (local) or **MongoDB Atlas** (cloud)

---

## 📁 Project Structure

```
nodejs_hotels_simple_crud/
│
├── dbconnection/
│   ├── db.js               → MongoDB connection setup using Mongoose
│   ├── server.js           → Express app, middleware, and route mounting
│   └── auth.js             → Passport.js local authentication strategy
│
├── models/
│   ├── Person.js           → Schema/model for hotel staff (with bcrypt hashing)
│   └── MenuItem.js         → Schema/model for menu items
│
├── routes/
│   ├── personRoutes.js     → CRUD routes for /person (protected)
│   └── menuItemRoutes.js   → CRUD routes for /menu (public)
│
├── .env                    ← Environment variables 
├── .gitignore
└── package.json
```

---

## 🚀 Features

- MongoDB connection via local or Atlas using environment variables
- Express routing with modular route files (Separation of Concerns)
- Full CRUD — POST, GET, PUT, DELETE
- Query filters by role (chef/waiter/manager) and taste (Sweet/Spicy/Sour)
- Async/await for clean asynchronous code
- 🔐 **Passport.js** local authentication strategy
- 🔐 **bcrypt** password hashing — plain text passwords never stored in DB
- 🔐 Protected `/person` routes — requires valid credentials on every request
- 🔐 `comparePassword()` instance method for secure login verification

---

## 🛠️ Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/pareshkharche/nodejs_hotels_simple_crud.git
cd nodejs_hotels_simple_crud
```

### 2. Install Dependencies

```bash
npm install
```

Installs: `express`, `mongoose`, `dotenv`, `passport`, `passport-local`, `bcrypt`, `nodemon`

---

### 3. Configure `.env` File ⚠️ Important

Create a `.env` file in the **project root** (same folder as `package.json`):

#### 🟡 Local MongoDB

```env
MONGODB_URL_LOCAL=mongodb://localhost:<port>/<dbname>
PORT=<your_port>
```

#### 🟢 MongoDB Atlas (Cloud)

```env
MONGODB_URL_ATLAS=mongodb+srv://<username>:<password>@<cluster>/<dbname>?retryWrites=true&w=majority
PORT=<your_port>
```

> ⚠️ Never push your `.env` file to GitHub. It is already listed in `.gitignore`.

---

### 4. Run the Server

```bash
nodemon dbconnection/server.js
```

Server runs at: `http://localhost:yourportnumber`

---

## 🔐 Authentication

All `/person` routes are **protected** by Passport.js local authentication middleware.

Every request to `/person` must include `username` and `password` in the **request body** — passport reads them automatically and verifies against the database before allowing access.

`/menu` routes are **public** — no credentials needed.

### How it works:
1. Request hits `/person`
2. `localAuthMiddleware` triggers Passport local strategy
3. Passport finds the user by `username` in MongoDB
4. `bcrypt.compare()` checks submitted password against stored hash
5. ✅ Match → request proceeds | ❌ No match → `401 Unauthorized`

> Passwords are **never stored as plain text**. The `pre('save')` hook in `Person.js` automatically hashes every password with bcrypt before it reaches the database.

---

## 🧪 API Endpoints

### 📍 Person (Hotel Staff) — 🔐 Protected

All `/person` endpoints require `username` + `password` in the request body.

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/person` | Add a new staff member |
| GET | `/person` | Get all staff members |
| GET | `/person/:workType` | Filter by role: `chef`, `waiter`, `manager` |
| PUT | `/person/:id` | Update staff by MongoDB ID |
| DELETE | `/person/:id` | Remove staff by MongoDB ID |

**Example — POST `/person`** (also used to authenticate for all other requests)

```json
{
  "username": "amit_chef",
  "password": "yourpassword",
  "name": "Amit Shah",
  "age": 28,
  "work": "chef",
  "mobile": "9876543210",
  "email": "amit@hotel.com",
  "address": "Mumbai",
  "salary": 35000
}
```

> 💡 **First time setup:** To add your very first user, temporarily remove `localAuthMiddleware` from the `/person` route in `server.js`, add the user, then add the middleware back.

---

### 📍 Menu Items — 🌐 Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/menu` | Add a new menu item |
| GET | `/menu` | Get all menu items |
| GET | `/menu/:taste` | Filter by taste: `Sweet`, `Spicy`, `Sour` |
| PUT | `/menu/:id` | Update a menu item by MongoDB ID |
| DELETE | `/menu/:id` | Remove a menu item by MongoDB ID |

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

## 🧠 Concepts Covered

| Concept | Where Used |
|---------|------------|
| MongoDB + Mongoose connection | `db.js` |
| Schema with enums, required, unique | `Person.js`, `MenuItem.js` |
| Modular Express routing | `personRoutes.js`, `menuItemRoutes.js` |
| Async/await for DB operations | All route files |
| Passport.js local strategy | `auth.js` |
| bcrypt password hashing | `Person.js` pre-save hook |
| Mongoose pre-save middleware | `Person.js` |
| Custom instance methods | `comparePassword()` in `Person.js` |
| Environment variables with dotenv | `db.js`, `server.js` |
| Express middleware (logger, auth) | `server.js` |

---

## 📝 Notes

- Make sure `.env` is in `.gitignore` — credentials must **never** be pushed to GitHub
- To switch between local and Atlas DB, update the connection variable in `db.js`
- Passwords in DB are always bcrypt hashed — you can verify this in MongoDB Compass
- This API uses **session: false** (stateless) — credentials must be sent with every request

---
