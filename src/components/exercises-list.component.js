import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


// this is the Exercise component
// The key thing that makes this type of component different from a class component is the lack of state and lifecycle methods. 
//If all you need to do is to accept props and return JSX, use a functional component instead of a class component.
//
//Two components in this file. This is a functional react component 
// the difference is the lack of state and life cycle methods

//It outputs a table row with the values of the properties of the exercise item passed into the component
// in link: One link goes to the edit route and the other calls the deleteExercise method.
const Exercise = props => (
    <tr>
      <td>{props.exercise.username}</td>
      <td>{props.exercise.description}</td>
      <td>{props.exercise.duration}</td>
      <td>{props.exercise.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
      </td>
    </tr>
  )

// implemented as a class componenet which has state and lifecycle methods
export default class ExercisesList extends Component {

    constructor(props) {
        super(props);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.state = { exercises: [] };
    }

    //The code will run before the page is rendered and add the list of exercises to the state. 
    //The axios.get method accesses the /exercises endpoint.
    //Then we assign response.data to the exercises property of the component’s state object with the this.setState method

    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
            .then(response => {
                this.setState({ exercises: response.data });
            })
            .catch((error) => {
                console.log(error);
            })
    }

    //We use the axios.delete method, then we update the state of exercises and filter out the exercise that was deleted.
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/' + id)
            .then(res => console.log(res.data));

            //whenever we do setState, React will automatically update the page with new State
            // filter the array of exercises. For ever element (el) in exercise array we will return it if the element id (el._id)
            // does not equal  the id
            // why is there _id ???
            // since in mongoDB you see the _id which is created automatically when we created the object
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }

    //This method iterates through the list of exercise items by using the map function. 
    //Each exercise item is output with the Exercise component. 
    //The current exercise item is assigned to the exercise property of this component.
    // we pass in three props , the current exercise, the delete exercise method, the key
    exerciseList() {
        return this.state.exercises.map(currentexercise => {
          return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
      }

     
      // this renders a table where the body calls the exerciseList() helper method which returns row of table
    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}