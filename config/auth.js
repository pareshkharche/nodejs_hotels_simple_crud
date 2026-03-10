const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('../models/Person'); 

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    try {
        //console.log('Received credentials:', USERNAME, password);
        const user = await Person.findOne({username: USERNAME});
        if(!user)
            return done(null, false, {message: 'Incorrect username.'})
         // const isPasswordMatch = user.password === password ? true : false;
        const isPasswordMatch = user.comparePassword(password);
        return isPasswordMatch
                ? done(null, user)
                : done(null, false, { message: 'Incorrect password.' });

    } catch (err) {
        return done(err);
    }
}));


module.exports = passport; 
