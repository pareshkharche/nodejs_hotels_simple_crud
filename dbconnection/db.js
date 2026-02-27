/**
 * db.js
 * Purpose: MongoDB database connection using Mongoose
 *
 * This file handles the connection to our local MongoDB database.
 * It is imported in server.js so the connection is established
 * as soon as the server starts.
 *
 * Tools used: Mongoose, MongoDB Compass (to visually see the data)
 */

const mongoose = require('mongoose');
const path = require('path');
 
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });

// ─────────────────────────────────────────
// MongoDB Connection URL
// Format: mongodb://host:port/databaseName
// Port 27017 is the default MongoDB port
// ─────────────────────────────────────────
const mongoURL = process.env.MONGODB_URL_LOCAL;  //local db connection
// mongoURL = process.env.MONGODB_URL; //mongoatlas db connection url

// ─────────────────────────────────────────
// NOTE: Older Mongoose versions needed extra options like:
//   useNewUrlParser: true, useUnifiedTopology: true
// In newer versions of Mongoose (v7+), these are no longer needed.
// The simple .connect(url) call works directly now.
// ─────────────────────────────────────────
mongoose.connect(mongoURL)
    .then(() => console.log('✅ Connected to MongoDB successfully'))
    .catch((err) => console.log('❌ MongoDB connection error:', err));

// ─────────────────────────────────────────
// Mongoose Default Connection Object
// mongoose.connection gives us the active connection instance
// We use it to listen for connection lifecycle events
// ─────────────────────────────────────────
const db = mongoose.connection;

// Fires if any error occurs on the connection after it is established
db.on('error', (err) => {
    console.log('⚠️  Mongoose connection error:', err);
});

// Fires when the connection is lost (e.g., MongoDB server goes down)
db.on('disconnected', () => {
    console.log('🔌 Mongoose connection disconnected');
});

// Fires once the connection is successfully open
db.once('open', () => {
    console.log('📂 MongoDB connection is open and ready');
});

// Export the db connection so other files can import it
module.exports = db;
