import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom"; // npm install react-router-dom
import "bootstrap/dist/css/bootstrap.min.css" //npm install boostrap

// import the names of the different components and their location 
import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

//main React App 
// the path attribute is set to attribute path. if enter the route url then goes to the specific component
function App() {
  return (
    <Router>
      <div className = "container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
  
}

export default App;
