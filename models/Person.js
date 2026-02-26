/**
 * Person.js
 * Purpose: Mongoose schema and model for a hotel staff member
 *
 * A "schema" defines the structure/shape of a document in MongoDB.
 * A "model" is a class built from the schema — we use it to create,
 * read, update, and delete (CRUD) documents in the "people" collection.
 *
 * This model is used in: routes/personRoutes.js
 */

const mongoose = require('mongoose');

// ─────────────────────────────────────────
// Person Schema
// Defines what fields a person document has and their rules
// ─────────────────────────────────────────
const personSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true          // name is mandatory
    },

    age: {
        type: Number            // optional field
    },

    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],  // only these values are allowed
        required: true
    },

    mobile: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true            // no two persons can have the same email
    },

    address: {
        type: String            // optional field
    },

    salary: {
        type: Number,
        required: true
    }

});

// ─────────────────────────────────────────
// Create Model from Schema
// 'Person' → Mongoose will look for/create a collection called 'people' in MongoDB
// ─────────────────────────────────────────
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
