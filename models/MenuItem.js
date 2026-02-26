/**
 * MenuItem.js
 * Purpose: Mongoose schema and model for a hotel menu item
 *
 * Each menu item has a name, price, taste category, and other details.
 * The model is used to perform CRUD operations on the "menuitems" collection in MongoDB.
 *
 * This model is used in: routes/menuItemRoutes.js
 */

const mongoose = require('mongoose');

// ─────────────────────────────────────────
// MenuItem Schema
// ─────────────────────────────────────────
const menuItemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    taste: {
        type: String,
        enum: ['Sweet', 'Spicy', 'Sour'],   // only these taste values are allowed
        required: true
    },

    is_drink: {
        type: Boolean,
        default: false          // if not provided, defaults to false (it's food)
    },

    ingredients: {
        type: [String],         // array of strings
        default: []             // starts as empty array if not provided
    },

    num_sales: {
        type: Number,
        default: 0              // new items start with 0 sales
    }

});

// ─────────────────────────────────────────
// Create Model from Schema
// 'MenuItem' → MongoDB collection will be called 'menuitems'
// ─────────────────────────────────────────
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
