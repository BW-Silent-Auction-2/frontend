import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import "../css/index.css";

const formSchema = yup.object().shape({
  username: yup
    .string()
    .min(8, "*Must contain 8 characters")
    .required("Username is required"),
  password: yup.string().required("*Password is required"),
});

const Header = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });

  //const [loggedIn, setLoggedIn] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  const [errorState, setErrorState] = useState({
    username: "",
    password: "",
  });

  const validate = (e) => {
    let value = e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrorState({
          ...errorState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrorState({
          ...errorState,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    validate(e);
    let value = e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted!");
    axios
      .post(
        "https://silent-auction-2.herokuapp.com/auth/users/login",
        formState
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-wrapper">
      <div className="container-navbar">
        <h1>SILENT AUCTION</h1>

        <nav className="navbar">
          <button className="btn-container">
            <Link to="/">Home</Link>
          </button>
          <button className="btn-container">
            <Link to="/create">Create Auction</Link>
          </button>

          <form id="form" onSubmit={formSubmit}>
            <label className="formLabel" htmlFor="username">
              {errorState.username.length > 0 ? (
                <p className="error">{errorState.username}</p>
              ) : null}
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={formState.username}
                onChange={inputChange}
              />
            </label>
            <label className="formLabel" htmlFor="password">
              {errorState.password.length > 0 ? (
                <p className="error">{errorState.password}</p>
              ) : null}
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Password"
                value={formState.password}
                onChange={inputChange}
              />
            </label>
            <button disabled={buttonDisabled} className="btn-container">
              Login
            </button>
          </form>

          <button className="btn-container">
            <Link to="/signup">Sign Up</Link>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
