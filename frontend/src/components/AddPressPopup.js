import React, { useState } from "react";

function AddPressPopup({ onClose, onAddPress }) {
  const [author, setAuthor] = useState("");
  const [quote, setQuote] = useState("");
  const [pressImage, setPressImage] = useState("");
  const [pressLink, setPressLink] = useState("");

  const addPress = () => {
    const newPress = {
      author: author,
      quote: quote,
      press_image: pressImage,
      press_link: pressLink
    };
    // Make a POST request to the server to add the new press to the database
    fetch("/api/press/add", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPress)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(data => {
        // Call the onAddPress function passed as a prop with the new press
        onAddPress(data);
        // Close the popup
        onClose();
      })
      .catch(error => {
        console.error("Error adding press:", error);
      });
  };

  return (
    <div className="popup">
      <div className="addAuthor">
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </label>
      </div>
      <div className="addQuote">
        <label>
          Quote:
          <textarea
            value={quote}
            onChange={e => setQuote(e.target.value)}
          />
        </label>
      </div>
      <div className="addPressImage">
        <label>
          Press Image:
          <input
            type="text"
            value={pressImage}
            onChange={e => setPressImage(e.target.value)}
          />
        </label>
      </div>
      <div className="addPressLink">
        <label>
          Press Link:
          <input
            type="text"
            value={pressLink}
            onChange={e => setPressLink(e.target.value)}
          />
        </label>
      </div>
      <div className="popup-buttons">
        <button className="popup-button" onClick={onClose}>
          Cancel
        </button>
        <button className="popup-button" onClick={addPress}>
          Add Press
        </button>
      </div>
    </div>
  );
}

export default AddPressPopup;