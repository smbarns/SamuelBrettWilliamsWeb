import React, { useState } from "react";
import "../styles/Admin.css";
import { NavLink } from "react-router-dom";

export default function Admin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailAddress = email.match(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
    );

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailAddress[0],
        password: password,
      }),
    })
      .then(function (response) {
        if (response.status === 401) {
          window.location.replace("http://localhost:3001/#/admin_login");
          response.json().then((data) => {
            setErrorMessage(data.message);
          });
        } else if (response.ok) {
          localStorage.setItem("token", "1");

          window.location.replace("http://localhost:3001/#/");
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <section className="admin">
      <div className="admin__content">
        <h3 className="admin__title">Admin Login</h3>
        <form className="admin__form" onSubmit={handleSubmit}>
          {errorMessage && <div>{errorMessage}</div>}
          <input
            className="admin__input admin__input--email"
            placeholder="Username or Email Address"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            className="admin__input admin__input--password"
            placeholder="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="admin__form-actions">
            <button className="btn btn-submit" type="submit">
              Login
            </button>
            <NavLink to="/forgot_password">Forgot password</NavLink>
          </div>
        </form>
      </div>
    </section>
  );
}
