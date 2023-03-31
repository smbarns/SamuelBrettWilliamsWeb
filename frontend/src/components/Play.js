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

  if (loading) return <div className="page">Loading...</div>;
  if (error) return <div className="page">Error!</div>;

  return (

    <div className="play">
      <div>
        <Link to={`/playdetails/${props.title}`} state={{
          title: props.title,
          cover: props.photo,
          writer: props.writer,
          photos: props.still_photos,
          duration: props.type_play,
          synopsis: props.description,
          production: props.productions,
          development: props.development,
          videos: props.videos,
          buy_links: props.buy_links,
        }} ><img className="playImg" src={placeholder} /> </Link>
      </div>
      <span className="playTitle"> {props.title} </span>
      <span className="playDuration"> {props.type_play} </span>
    </div>

  )
}

export default Play