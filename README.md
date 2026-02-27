# Day 5 - CRUD Operations with Node.js, Express, MongoDB & Mongoose

A REST API for a hotel management system. Supports full **CRUD** (Create, Read, Update, Delete) for hotel staff and menu items. All endpoints were tested using **Postman**, and data was viewed using **MongoDB Compass**.

---

## Project Structure

```
Day5Github/
├── DatabaseConnections/
│   ├── db.js           → MongoDB connection setup using Mongoose
│   └── server.js       → Express app, middleware, and route mounting
<<<<<<< Updated upstream
│   
=======
│ 
>>>>>>> Stashed changes
│
├── models/
│   ├── Person.js       → Mongoose schema/model for hotel staff
│   └── MenuItem.js     → Mongoose schema/model for menu items
│
└── routes/
    ├── personRoutes.js     → CRUD routes for /person
    └── menuItemRoutes.js   → CRUD routes for /menu
```

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Node.js | JavaScript runtime |
| Express.js | Web framework for building the API |
| MongoDB | NoSQL database to store data |
| Mongoose | ODM library — connects Node.js to MongoDB with schemas |
| Postman | API testing tool (sending GET, POST, PUT, DELETE requests) |
| MongoDB Compass | GUI to visually browse MongoDB collections |

---

## Setup & Run

**1. Install dependencies**
```bash
npm install express mongoose
```

**2. Make sure MongoDB is running locally**
```bash
# MongoDB default runs on port 27017
# Start it via MongoDB Compass or run: mongod
```

**3. Start the server**
```bash
node DatabaseConnections/server.js
```

Server runs at: `http://localhost:3000`

---

## API Endpoints

### Person (Hotel Staff)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/person` | Add a new staff member |
| GET | `/person` | Get all staff members |
| GET | `/person/:workType` | Filter by role: `chef`, `waiter`, or `manager` |
| PUT | `/person/:id` | Update a staff member by MongoDB ID |
| DELETE | `/person/:id` | Delete a staff member by MongoDB ID |

**Sample POST /person body:**
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

### Menu Items

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/menu` | Add a new menu item |
| GET | `/menu` | Get all menu items |
| GET | `/menu/:taste` | Filter by taste: `sweet`, `spicy`, or `sour` |
| PUT | `/menu/:id` | Update a menu item by MongoDB ID |
| DELETE | `/menu/:id` | Delete a menu item by MongoDB ID |

**Sample POST /menu body:**
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

## Key Concepts Learned

- Setting up a MongoDB connection with Mongoose
- Defining schemas with data types, required fields, enums, and defaults
- Creating Express Router to separate routes by feature
- Full CRUD using Mongoose methods: `.save()`, `.find()`, `.findByIdAndUpdate()`, `.findByIdAndDelete()`
- Using `async/await` instead of callbacks for cleaner code
- Testing APIs with Postman
