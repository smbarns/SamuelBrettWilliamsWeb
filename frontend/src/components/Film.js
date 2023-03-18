import React from 'react'
import placeholder from '../assets/placeholder.png'
import '../styles/Film.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
function Film(props) {

  const [data, setData] = useState(null);
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const title = encodeURIComponent(props.title);

  useEffect(() => {
    fetch(`http://localhost:3000/api/films?search=${title}`)
      .then((res) => res.json())
      .then((data) => {
        setPic(data[0].film_photo)
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

    <div className="film">
      <Link to={`/filmdetails/${props.title}`} state={{
        cover: props.film_photo,
        title: props.title,
        director: props.director,
        writer: props.screenplay,
        stars: props.stars,
        status: props.status,
        available: props.available,
        synopsis: props.description,
        photos: props.photos,
        videos: props.videos
      }} ><img className="filmImg" src={placeholder} /></Link>
      <span className="filmTitle"> {props.title} </span>
      <span className="filmType">  FILM </span>
    </div>

  )
}

export default Film