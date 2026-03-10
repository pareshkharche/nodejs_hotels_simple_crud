const mongoose = require('mongoose');
const path = require('path');
 
require('dotenv').config({ path: path.resolve(__dirname, "../.env") });

const mongoURL = process.env.MONGODB_URL_LOCAL;  //local db connection

mongoose.connect(mongoURL)
    .then(() => console.log('✅ Connected to MongoDB successfully'))
    .catch((err) => console.log('❌ MongoDB connection error:', err));

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
