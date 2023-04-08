import React, { useEffect } from "react";

function Authenticate({ setAuthen }) {
  useEffect(() => {
    // Make a request to check the authentication status
    fetch("http://localhost:3000/check_auth")
      .then(function (response) {
        if (response.ok) {
          response.json().then((data) => {
            console.log("authenticated!");
            setAuthen(data.authenticated);
          });
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      })
      .catch((error) => console.log(error));
  }, []);
}

export default Authenticate;
