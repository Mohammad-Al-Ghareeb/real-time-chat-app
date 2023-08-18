import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { handleUserRegister } = useAuth();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="auth--container">
      <div className="form--wrapper">
        <form
          onSubmit={(e) => {
            handleUserRegister(e, credentials);
          }}
        >
          <div className="field--wrapper">
            <label>Name:</label>
            <input
              type="text"
              required
              name="name"
              placeholder="Enter your name"
              value={credentials.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <label>Email:</label>
            <input
              type="email"
              required
              name="email"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <label>Password:</label>
            <input
              type="Password"
              required
              name="password1"
              placeholder="Enter Password"
              value={credentials.password1}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <label>Confirm Password:</label>
            <input
              type="Password"
              required
              name="password2"
              placeholder="Confirm Your Password"
              value={credentials.password2}
              onChange={handleInputChange}
            />
          </div>

          <div className="field--wrapper">
            <input
              className="btn btn--lg btn--main"
              type="submit"
              value={"Register"}
            />
          </div>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
