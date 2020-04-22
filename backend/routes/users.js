const router = require('express').Router();
let User = require('../models/user.model'); //requires mongoose module we created

// the first route that handles incoming HTTP get requests from the /users path
router.route('/').get((req, res) => {
    User.find() //mongoose method that gets all the users from mongoose atlas database 
    .then(users => res.json(users)) //after it finds, get all users and returns the users in json format that we got from database
    .catch(err => res.status(400).json('Error: ' + err)); // if there's error - return a error 400 with the message
});

//handles incoming HTTP post request. 
router.route('/add').post((req, res) => {
    const username = req.body.username; //we assign the username to variable, and create new instance of username
    const newUser = new User({username});

    newUser.save() // save the new user to the databse
    .then(() => res.json('User added!')) // return prompt that user is added; else return error message
    .catch(err => res.status(400).json('Error: ' + err));
});


//For all these router files, need to export router
module.exports = router;