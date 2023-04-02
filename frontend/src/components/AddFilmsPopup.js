
import React, { useState } from "react";

function AddFilmsPopup({ onClose, onAddFilm }) {
    const [title, setTitle] = useState("");
    const [director, setDirector] = useState("");
    const [screenplay, setScreenplay] = useState("");
    const [stars, setStars] = useState("");
    const [status, setStatus] = useState("");
    const [type_film, setTypeFilm] = useState("");
    const [buy_links, setBuyLinks] = useState("");
    //add cover photo
    const addFilm = () => {
        const newFilm = {
          title: title,
          director: director,
          screenplay: screenplay,
          stars: stars,
          status: status,
          type_film: type_film,
          buy_links: buy_links
        };
        fetch('http://localhost:3000/api/films')
       .then(response => {
         if (response.ok) {
           return response.json()
         }
         throw response;
       })
       .catch(error => {
        console.error('Error adding film:', error);
      });
      }
      const handleStatusChange = (e) => {
        setStatus(e.target.value);
      }
      const handleFilmTypeChange = (e) => {
        setTypeFilm(e.target.value);
      }
  return (
    <div className = "popup">
        <div className = "addTitle">
            <label>
                Title:
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
            </label>
        </div>
        <div className = "addDirector">
            <label>
                Director:
                <input type="text" value={director} onChange={e => setTitle(e.target.value)} />
            </label>
        </div>
        <div className = "addScreenplay">
            <label>
                Screenplay:
                <input type="text" value={screenplay} onChange={e => setTitle(e.target.value)} />
            </label>
        </div>
        <div className = "addStars">
            <label>
                Stars:
                <input type="text" value={stars} onChange={e => setTitle(e.target.value)} />
            </label>
        </div>
        <div className = "addStatus">
            <label>
                Status:
                <select value={status} onChange={handleStatusChange}>
                    <option value="">--Select Status of Film--</option>
                    <option value="released">Released</option>
                    <option value="comingSoon">Coming Soon</option>
                    <option value="script">Script</option>
                </select>
            </label>
        </div>
        <div className = "addTypeFilm">
        <label>
                Film Type:
                <select value={type_film} onChange={handleFilmTypeChange}>
                    <option value="">--Select Type of Film--</option>
                    <option value="featured">Featured</option>
                    <option value="short">Short</option>
                </select>
            </label>
        </div>
        <div className = "addBuyLinks">
            <input type="text" value={buy_links} onChange={e => setTitle(e.target.value)} />
        </div>
        
    </div>
  );
}

export default AddFilmsPopup;