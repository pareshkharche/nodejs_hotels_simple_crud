/**
 * server.js
 * Purpose: Main entry point of the Express application
 *
 * This file:
 *  1. Creates the Express app
 *  2. Connects to MongoDB (via db.js)
 *  3. Registers middleware (JSON parser)
 *  4. Mounts route files for /person and /menu endpoints
 *  5. Starts the server on port 3000
 *
 * Tools used: Express.js, Postman (to test all API endpoints)
 */

const express = require('express');
const app = express();

// Establish MongoDB connection as soon as the server starts
const db = require('./db');

require('dotenv').config();

// ─────────────────────────────────────────
// Middleware
// express.json() parses incoming requests with JSON payloads
// Without this, req.body would be undefined when we POST data via Postman
// ─────────────────────────────────────────
app.use(express.json());
//where db hosted it gives you a port number if not then this local port will be run that's why we write this 
const PORT = process.env.PORT || 3000;

// ─────────────────────────────────────────
// Routes
// Instead of writing all routes here, we split them into separate files
// inside the /routes folder — one file per feature (person, menu)
// This is called Separation of Concerns and is a good practice
// ─────────────────────────────────────────
const personRoutes = require('../routes/personRoutes');
const menuItemRoutes = require('../routes/menuItemRoutes');

// Mount routes — all person-related URLs will start with /person
// and all menu-related URLs will start with /menu
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

// ─────────────────────────────────────────
// Root Route
// Simple GET route to confirm the server is running
// Test this in browser or Postman: GET http://localhost:3000/
// ─────────────────────────────────────────
app.get('/', (req, res) => {
    res.send('Welcome to Hotel🍽️');
});

// ─────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────
app.listen(PORT, () => {
    console.log('🚀 Server is listening on port 3000');
});
