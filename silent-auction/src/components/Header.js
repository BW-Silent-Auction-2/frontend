import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import "../css/index.css";

const formSchema = yup.object().shape({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required")
})


const Header = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  })

  const [loggedIn, setLoggedIn] = useState(true);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);


const [errorState, setErrorState] = useState({
  email: "",
  password: ""
});

const validate = e => {
  let value = 
  e.target.type === "text" ?
  e.target.name : e.target.value;
  yup
  .reach(formSchema, e.target.name)
  .validate(value)
  .then(valid => {
    setErrorState({
      ...errorState,
      [e.target.name] : ""
    });
  });
};

const inputChange = e => {
  e.persist();
  validate(e);
  let value = e.target.value;
  // value = e.target.type === "text" ? e.target.checked : e.target.value;
  setFormState({ ...formState, [e.target.name] : value });
}

const formSubmit = e => {
  e.preventDefault();
  console.log("form submitted!");
  axios
  .post("https://regres.in/api/users", formState)
  .then(response => console.log(response))
  .catch(err => console.log(err));
};

  return (
    
    
      <div className="container-wrapper">
        <div className="container-navbar">
          <h1>SILENT AUCTION</h1>

          <nav className="navbar">
            <Route exact path="/"></Route>
            <button>
              <Link to="/">Home</Link>
            </button>
            <button>
              <Link to="/create">Create Auction</Link>
            </button>
      
            <form id="form" onSubmit={formSubmit}>
    <label class="formLabel" htmlFor="email">
      <input
      type="text"
      name="email"
      id="email"
      placeholder="Email Address"
      value={formState.email}
      onChange={inputChange}
      />
      {errorState.email.length > 0 ? ( <p className="error">{errorState.email}</p>) : null}
    </label>
    <label class="formLabel" htmlFor="password">
      <input
      type="text"
      name="password"
      id="password"
      placeholder="Password"
      value={formState.password}
      onChange={inputChange}
      />
    </label>
    <button disabled = {buttonDisabled}>Login</button>
      </form>


            <button>Sign Up</button>
          </nav>
        </div>
      </div>
   
  );
};

export default Header;
