import React from 'react'
import '../styles/Film.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
function Film(props) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const title = encodeURIComponent(props.title);

  useEffect(() => {
    fetch(`http://localhost:3000/api/films?search=${title}`)
      .then((res) => res.json())
      .then((data) => {})
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
      <div>
        <Link to={`/filmdetails/${props.title}`} state={{
          cover: props.photo,
          title: props.title,
          director: props.director,
          writer: props.screenplay,
          stars: props.stars,
          status: props.status,
          buy_links: props.buy_links,
          synopsis: props.description,
          photos: props.still_photos,
          videos: props.videos
        }} ><img className="filmImg" src={props.photo} /></Link>
      </div>
      <span className="filmTitle"> {props.title} </span>
      <span className="filmDuration"> {props.type_film} </span>
    </div>

  )
}

export default Film