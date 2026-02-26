/**
 * personRoutes.js
 * Purpose: All API routes related to hotel staff (Person)
 *
 * Why a separate routes file?
 * If we put every route in server.js, it becomes huge and unmanageable.
 * Splitting routes by feature (person, menu) keeps code clean and organized.
 * This pattern is called Separation of Concerns.
 *
 * Base URL: /person  (mounted in server.js)
 *
 * Available endpoints (test all using Postman):
 *  POST   /person              → Add a new person
 *  GET    /person              → Get all persons
 *  GET    /person/:workType    → Get persons filtered by work (chef/waiter/manager)
 *  PUT    /person/:id          → Update a person by MongoDB ID
 *  DELETE /person/:id          → Delete a person by MongoDB ID
 */

const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

// ─────────────────────────────────────────
// POST /person
// Add a new staff member to the database
// Send JSON body in Postman with: name, age, work, mobile, email, address, salary
// ─────────────────────────────────────────
router.post('/', async (req, res) => {
    try {
        const data = req.body;                  // get data from request body
        const newPerson = new Person(data);     // create a new Person document
        const response = await newPerson.save(); // save to MongoDB
        console.log('✅ Person saved:', response.name);
        res.status(200).json(response);
    } catch (err) {
        console.log('❌ Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ─────────────────────────────────────────
// GET /person
// Fetch all staff members from the database
// ─────────────────────────────────────────
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();       // .find() with no args = get all
        console.log('✅ All persons fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log('❌ Error fetching persons:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ─────────────────────────────────────────
// GET /person/:workType
// Fetch staff members filtered by their work type
// Example: GET /person/chef  → returns all chefs
// Valid values: chef, waiter, manager
// ─────────────────────────────────────────
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;   // extract value from URL

        const validTypes = ['chef', 'manager', 'waiter'];
        if (validTypes.includes(workType)) {
            const response = await Person.find({ work: workType });
            console.log(`✅ Fetched persons with work: ${workType}`);
            res.status(200).json(response);
        } else {
            res.status(400).json({ error: 'Invalid work type. Use chef, waiter, or manager.' });
        }
    } catch (err) {
        console.log('❌ Error fetching by work type:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ─────────────────────────────────────────
// PUT /person/:id
// Update an existing person's data by their MongoDB _id
// Example: PUT /person/64abc123...
// Send updated fields as JSON body in Postman
// ─────────────────────────────────────────
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;             // MongoDB _id from URL
        const updatedData = req.body;               // new data from request body

        const response = await Person.findByIdAndUpdate(personId, updatedData, {
            new: true,              // return the updated document (not the old one)
            runValidators: true,    // re-run schema validations on update
        });

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('✅ Person updated:', response.name);
        res.status(200).json(response);
    } catch (err) {
        console.log('❌ Error updating person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ─────────────────────────────────────────
// DELETE /person/:id
// Delete a staff member by their MongoDB _id
// Example: DELETE /person/64abc123...
// ─────────────────────────────────────────
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('✅ Person deleted');
        res.status(200).json({ message: 'Person deleted successfully' });
    } catch (err) {
        console.log('❌ Error deleting person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router so it can be mounted in server.js
module.exports = router;
