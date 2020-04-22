import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker'; // we also npm install react-datepicker
import 'react-datepicker/dist/react-datepicker.css'; //styling for date picker


export default class CreateExercise extends Component {

//Constructor

constructor(props) {
    super(props); //we need to call super when defining constructor of subclass! super(props)


    //to make sure this works properly in our methods, we need to bind the methods to this.
    // we want "this" to refer to this class "CreateExercise"
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {   // set the initial state of the component by assigning an 
        //object to this.state. The properties of state will correspond to the fields in the MongoDB document. 

        // state is basically how you create variables in react!
        // whenever we update the state; it will automatically update the page with new values!
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: [] // why is there users? we will have this in dropdown menu where u can select user to update exercise
    }
}

//hardcoded test user
// life cycle method - gets called before anything loads to the page- runs this first!
componentDidMount() {
    axios.get('http://localhost:5000/users/')
  .then(response => {
    if (response.data.length > 0) { // make sure theres at least 1 user in database
      this.setState({ 
        users: response.data.map(user => user.username), //data is array we map it and return user.username
        username: response.data[0].username // set to the first user of database
      });
    }
  })
  .catch((error) => {
    console.log(error);
  })
}

//when the username is being changed, we set the state!
// we a;ways will use the setState method in react
// we will have a webform, where theres textbox where people enter username
// the target is the textbox, and the value of the textbox. So while the user enters it and types, it sets it to username
onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
}

onChangeDescription(e) {
    this.setState({
    description: e.target.value
    });
}
  
onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  
}
  
//ChangeDate method looks a little different than the others. This is because of the date picker library
onChangeDate(date) {
    this.setState({
      date: date
    });
}

//handle the submit event of the form
onSubmit(e) {
    e.preventDefault(); // e.preventDefault() prevents the default HTML form submit behavior from taking place.
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
  console.log(exercise);

  axios.post('http://localhost:5000/exercises/add', exercise) // posst it then log result to console
  .then(res => console.log(res.data));

  window.location = '/'; // After the form is submitted, the location is updated so the user is taken back to the home page.
  
}


//form code
// on submit we call this.onSubmit
// for username whenever they set valuye this.state.username 
// we have this.onChangeUsername
// this.state.users.map .. etc.
// is javascript that takes a user, for each user in array, will return an option in a select box
// each option will show key, value


render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}