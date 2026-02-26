/**
 * menuItemRoutes.js
 * Purpose: All API routes related to hotel menu items
 *
 * Same pattern as personRoutes.js — routes are separated by feature
 * to keep the codebase organized.
 *
 * Base URL: /menu  (mounted in server.js)
 *
 * Available endpoints (test all using Postman):
 *  POST   /menu              → Add a new menu item
 *  GET    /menu              → Get all menu items
 *  GET    /menu/:taste       → Get items filtered by taste (sweet/spicy/sour)
 *  PUT    /menu/:id          → Update a menu item by MongoDB ID
 *  DELETE /menu/:id          → Delete a menu item by MongoDB ID
 */

const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// ─────────────────────────────────────────
// POST /menu
// Add a new menu item to the database
// Send JSON body in Postman with: name, price, taste, is_drink, ingredients, num_sales
// ─────────────────────────────────────────
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenuItem = new MenuItem(data);
        const response = await newMenuItem.save();
        console.log('✅ Menu item saved:', response.name);
        res.status(200).json(response);
    } catch (err) {
        console.log('❌ Error saving menu item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ─────────────────────────────────────────
// GET /menu
// Fetch all menu items from the database
// ─────────────────────────────────────────
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();     // .find() with no args = get all
        console.log('✅ All menu items fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log('❌ Error fetching menu items:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ─────────────────────────────────────────
// GET /menu/:taste
// Fetch menu items filtered by taste
// Example: GET /menu/spicy  → returns all spicy items
// Valid values: sweet, spicy, sour (case-insensitive — we normalize below)
// ─────────────────────────────────────────
router.get('/:taste', async (req, res) => {
    try {
        let taste = req.params.taste;

        // Normalize to Title Case so "spicy", "SPICY", "Spicy" all work
        taste = taste.charAt(0).toUpperCase() + taste.slice(1).toLowerCase();

        const validTastes = ['Spicy', 'Sour', 'Sweet'];
        if (validTastes.includes(taste)) {
            const response = await MenuItem.find({ taste: taste });
            if (!response.length) {
                return res.status(404).json({ message: 'No menu items found for this taste' });
            }
            console.log(`✅ Fetched menu items with taste: ${taste}`);
            return res.status(200).json(response);
        } else {
            return res.status(400).json({ error: 'Invalid taste. Use sweet, spicy, or sour.' });
        }
    } catch (err) {
        console.log('❌ Error fetching by taste:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// ─────────────────────────────────────────
// PUT /menu/:id
// Update a menu item by its MongoDB _id
// Example: PUT /menu/64abc123...
// Send updated fields as JSON body in Postman
// ─────────────────────────────────────────
router.put('/:id', async (req, res) => {
    try {
        const menuItemId = req.params.id;
        const updatedData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuItemId, updatedData, {
            new: true,              // return updated document
            runValidators: true,    // re-run schema validations
        });

        if (!response) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        console.log('✅ Menu item updated:', response.name);
        res.status(200).json(response);
    } catch (err) {
        console.log('❌ Error updating menu item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ─────────────────────────────────────────
// DELETE /menu/:id
// Delete a menu item by its MongoDB _id
// Example: DELETE /menu/64abc123...
// ─────────────────────────────────────────
router.delete('/:id', async (req, res) => {
    try {
        const menuItemId = req.params.id;

        const response = await MenuItem.findByIdAndDelete(menuItemId);
        if (!response) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        console.log('✅ Menu item deleted');
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        console.log('❌ Error deleting menu item:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router so it can be mounted in server.js
module.exports = router;
