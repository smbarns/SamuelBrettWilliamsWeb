import React from 'react'
import placeholder from '../assets/placeholder.png'
import '../styles/Play.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
function Play(props) {

  const [data, setData] = useState(null);
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const title = encodeURIComponent(props.title);

  useEffect(() => {
    fetch(`http://localhost:3000/api/plays?search=${title}`)
      .then((res) => res.json())
      .then((data) => {
        setPic(data[0].play_photo)
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }, [])

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/feature/delete/play?id=${props.id}`)
      .then(response => response.json())
      .catch(error => {
        console.error(error);
        return alert('Error: Could not delete feature!');
      });
    window.location.reload();
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    handleDelete();
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (loading) return <div className="page">Loading...</div>;
  if (error) return <div className="page">Error!</div>;

  return (

    <div className="play">
      <Link to={`/playdetails/${props.title}`} state={{
        title: props.title,
        cover: props.play_photo,
        photos: props.photos,
        duration: props.type_play,
        synopsis: props.description,
        production: props.productions,
        development: props.development,
        info: props.info,
        videos: props.videos,
      }} ><img className="playImg" src={placeholder} /></Link>
      <span className="playTitle"> {props.title} </span>
      <span className="playDuration"> {props.type_play} </span>
      <div>
            <button className="delete-feature" onClick={() => setShowConfirm(true)}>Delete</button>
            {showConfirm && (
              <div className = "popup">
                <div className = "popup-inner-playsAdd">
                  <div className="popup-header">
                    <h2>Are you sure you want to delete this feature?</h2>
                  </div>
                  <div className="popup-content">
                    <div className="popup-deleteFeature">
                      <button className="confirm-buttons" onClick={handleConfirm}>Yes</button>
                      <button className="confirm-buttons" onClick={handleCancel}>No</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
    </div>

  )
}

export default Play