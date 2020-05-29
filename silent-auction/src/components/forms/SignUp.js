import React, { useState, useEffect } from 'react';
import '../../css/index.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

const formSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is a required field"),
  lastName: yup
    .string()
    .required("Last name is a required field"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Must include email address"),
  password: yup
    .string()
    .required("Password is a required field"),
  userType: yup
    .string()
    .required(),
  username : yup
    .string()
    .required("User name is a required field")  


});

const SignupCard = props => {
  const history = useHistory();

  const [errorState, setErrorState] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const validate = e => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then(valid => {
        setErrorState({
          ...errorState,
          [e.target.name]: ""
        });
      })
      .catch(err => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0]
        });
      });
  };

  // enum for userType
  var userTypeEnum = {
    buyer: 1,
    seller: 2,
  };

  const [formState, setFormState] = useState({

    id: 0,
    username: "",
    firstName: "",
    lastName: "", // the id of the seller
    email: "",
    password: "",
    userType: userTypeEnum['buyer']

  });

  const inputChange = (e) => {
    e.persist();
    validate(e);
    let value = e.target.value;
    if (e.target.name === "userType") {
      formState.userType = userTypeEnum[value];

    } else {
      
      value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setFormState({ ...formState, [e.target.name]: value });
    }


  }

  const [buttonDisabled, setSubmitButton] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setSubmitButton(!valid); // enable submit button if form is valid
    });
  }, [formState]);

  const handleSubmit = (event) => {
    event.preventDefault();
    //axios
    //.post("https://silent-auction-2.herokuapp.com/auth/users/register", formState) // need end point
    //.then(response => console.log(response))
    //.catch(err => console.log(err));
    history.push("/confirm", formState.firstName );
    /*history.push({
      pathname: '/confirm',
      user: formState.firstName 
    });*/
  };

  return (

    <div className="mainContainer">
      <div className="signUpCard" >

        <h1>Create A New Account</h1>
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
          <label htmlFor="username"></label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="User name"
              value={formState.username}
              onChange={inputChange}
            />
            {errorState.username.length > 0 ? (
              <p className="error">{errorState.username}</p>
            ) : null}

            <label htmlFor="firstName"></label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First name"
              value={formState.firstName}
              onChange={inputChange}
            />
            {errorState.firstName.length > 0 ? (
              <p className="error">{errorState.firstName}</p>
            ) : null}

            <label htmlFor="lastName"></label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last name"
              value={formState.lastName}
              onChange={inputChange}
            />
            {errorState.lastName.length > 0 ? (
              <p className="error">{errorState.lastName}</p>
            ) : null}

            <label htmlFor="email"></label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={formState.email}
              onChange={inputChange}
            />
            {errorState.email.length > 0 ? (
              <p className="error">{errorState.email}</p>
            ) : null}

            <label htmlFor="password"></label>
            <input
              className="password"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formState.password}
              onChange={inputChange}
            />
            {errorState.password.length > 0 ? (
              <p className="error">{errorState.password}</p>
            ) : null}


            <label className="userType" htmlFor="userType">User Type:</label>
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

            {!buttonDisabled ? <div className="buttonContainer" onClick={handleSubmit}>  <div className="signup">Submit</div></div> : ""}

          </form>

        </div>



      </div>
    </div>

  );
}

export default SignupCard;