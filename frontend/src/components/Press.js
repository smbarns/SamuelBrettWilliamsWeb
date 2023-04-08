import React, { useEffect, useState } from "react";
import "../styles/PressDetails.css";
import axios from "axios";
function Press(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setAuthenticated(true);
    }
  }, []);

  const handleCancel = () => {
    setShowConfirm(false);
  };
  const handleConfirm = async () => {
    // do the real stuff

    // const response = await axios.delete(
    //   "http://localhost:3000/api/press/" + props.id
    // );

    const response = await fetch(
      "http://localhost:3000/api/press/" + props.id,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    if (json.success) {
      setShowConfirm(false);
    }
    console.log("response from api/dlete", response);
  };

  return (
    <div className="pressIcon">
      {props.press_image ? (
        <img className="press_image" src={props.press_image} alt="" />
      ) : (
        <span className="press_title"> {props.press_title} </span>
      )}
      <span className="project_title">
        {" "}
        {props.project_name.toUpperCase()}{" "}
      </span>
      <span className="quote"> "{props.quote}" </span>
      <span className="author"> {props.author} </span>

      {authenticated ? (
        <div>
          <button
            className="delete-feature"
            onClick={() => setShowConfirm(true)}
          >
            Delete
          </button>
          {showConfirm && (
            <div className="popup">
              <div className="popup-inner-upcomingAdd">
                <div className="popup-header">
                  <h2>Are you sure want to delete this press?</h2>
                </div>
                <div className="popup-content">
                  <div className="popup-deleteFeature">
                    <button className="confirm-buttons" onClick={handleConfirm}>
                      Yes
                    </button>
                    <button className="confirm-buttons" onClick={handleCancel}>
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Press;
