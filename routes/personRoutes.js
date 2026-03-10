const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');

const {jwtAuthMiddleware, generateToken} = require('./../config/jwt');

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;                  // get data from request body
        const newPerson = new Person(data);     // create a new Person document
        const response = await newPerson.save(); // save to MongoDB
        console.log('✅ Person saved:', response.name);

        const payload = {
            id: response.id,
            username: response.username
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is: ", token);

        res.status(200).json({response: response, token: token});
    } catch (err) {
        console.log('❌ Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//Login Route
router.post('/login', async(req, res) => {
    try {
        //Exttract username and password from req.body
        const {username, password} = req.body;

        //find the user by username
        const user = await Person.findOne({username: username});

        //if user doesnot exist or password doesnot match return error
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: "Invalid username or password"});
        }

        //generate token
        const payload={
            id: user.id,
            username: user.username
        }
        const token =generateToken(payload);

        //return token as response
        res.json({token})

    } catch (err) {
            console.error(err);
            res.status(500).json({error: "Internal server error"});
    }
})

//Profile route
router.get('/profile', jwtAuthMiddleware,  async(req, res) => {
    try {
        const userData= req.user;
        console.log("user data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);
        res.status(200).json({user});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: "Internal server error"});
        
    }
})

router.get('/', jwtAuthMiddleware,async (req, res) => {
    try {
        const data = await Person.find();       // .find() with no args = get all
        console.log('✅ All persons fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log('❌ Error fetching persons:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


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
