import React, { Component } from 'react';
import { Link } from 'react-router-dom'; //allows us to link to diff routes

// this code in return is basically the bootstrap navbar configured for the component
export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Exercise Tracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}