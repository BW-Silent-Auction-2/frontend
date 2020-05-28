import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import "../css/index.css";

const formSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
})


const Header = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: ""
  });


  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      setButtonDisabled(!valid);
    });
  }, [formState]);


const [errorState, setErrorState] = useState({
  username: "",
  password: ""
});

const validate = e => {
  let value = 
   e.target.value;
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

const inputChange = e => {
  e.persist();
  validate(e);
  let value =  e.target.value;
  setFormState({ ...formState, [e.target.name]: value });
}

const formSubmit = e => {
  e.preventDefault();
  console.log("form submitted!");
  axios
  .post("https://silent-auction-2.herokuapp.com/auth/users/login", formState)
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
    <label className="formLabel" htmlFor="username">
      <input
      type="text"
      name="username"
      id="username"
      placeholder="Username"
      value={formState.username}
      onChange={inputChange}
      />
      {errorState.username.length > 0 ? ( <p className="error">{errorState.username}</p>) : null}
    </label>
    <label className="formLabel" htmlFor="password">
      <input
      type="text"
      name="password"
      id="password"
      placeholder="Password"
      value={formState.password}
      onChange={inputChange}
      />
      {errorState.password.length > 0 ? ( <p className="error">{errorState.password}</p>) : null}
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
