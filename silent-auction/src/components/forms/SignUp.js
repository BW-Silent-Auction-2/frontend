import React, { useState, useEffect } from 'react';
import '../../css/index.css';
import { Link } from 'react-router-dom';
import axios from "axios";

const SignupCard = props => {

  const [formState, setFormState] = useState({

    id: 0,
    firstName: "",
    lastName: "", // the id of the seller
    email: "",
    password: "",
    userType: "buyer"

  });

  const inputChange = (e) => {
    e.persist();
    // validate the form

    let value = e.target.value;
    value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });

  }

  useEffect(() => {
    /*axios
    .get()
    .then(response => {
              
    })
    .catch(err => {
      console.log(err);
    }
    ); */

  }, [formState]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formState);
  };

  return (

    <div className="mainContainer">
      <div className="signUpCard" >

        <h1>Create A New Account</h1>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName"></label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First name"
              //value={formData.firstName}
              onChange={inputChange}
            />

            <label htmlFor="lastName"></label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              //value={formData.lastName}
              onChange={inputChange}
            />

            <label htmlFor="email"></label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              //value={formData.email}
              onChange={inputChange}
            />

            <label htmlFor="password"></label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              //value={formData.password}
              onChange={inputChange}
            />
            <label htmlFor="userType">User Type:</label>
            <select
              name="userType"
              id="userType"
              //value={formState.userType}
              placeholder="what do you want to do?"
              onChange={inputChange}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller </option>

            </select>

            <div className="buttonContainer" onClick={handleSubmit}>  <div className="signup">Submit</div></div>

          </form>

        </div>

        

      </div>
    </div>

  );
}

export default SignupCard;