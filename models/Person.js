const mongoose = require('mongoose');

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
    },

   
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }

});


personSchema.pre('save', async function() {
    const person = this;
    if(!person.isModified('password')) return;
    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(person.password,salt);
        
        person.password = hashedPassword;  
    } catch (err) {
        return next(err);
    }
});


personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
};

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
