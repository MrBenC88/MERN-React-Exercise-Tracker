const router = require('express').Router();
let Exercise = require ('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()  // find exercises from database
    .then(exercises => res.json(exercises)) //returns as json or else error
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/add').post((req, res) => { //if we have exercses /add post req assign variables
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()  //save exercise- then its a promise and return the json exercise added
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));

})

// the :id is like a variable. This is object id that is created automatically by mongoDB. 
// if do the get request on exercise object can get the info about that exercise 
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id) // find it by id
      .then(exercise => res.json(exercise))  //then return as json ; else return error
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/:id').delete((req, res) => {  // if its delete request then finds and deletes
    Exercise.findByIdAndDelete(req.params.id)
      .then(() => res.json('Exercise deleted.')) 
      .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/update/:id').post((req, res) => { //if route is update/ object id and is post, then we update it
    Exercise.findById(req.params.id) // find current exercise and update
      .then(exercise => {  
        exercise.username = req.body.username;  // sets new exercise variables to equal the new data
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);
  
        exercise.save() // save it
          .then(() => res.json('Exercise updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;

//To test the api is using a tool called insomnia