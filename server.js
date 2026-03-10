const express = require('express');
const app = express();
const db = require('./config/db');
require('dotenv').config();

const passport = require('./config/auth');

app.use(express.json());

const PORT = process.env.PORT || 3000;

//Middleware function
const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); //Move on to the next phase 
}
app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware =passport.authenticate('local', {session: false});

app.get('/', (req, res) => {
    res.send('Welcome to Hotel🍽️');
});

const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');


app.use('/person',  personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(PORT, () => {
    console.log('🚀 Server is listening on port 3000');
});
