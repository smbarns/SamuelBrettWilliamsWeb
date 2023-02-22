import React from 'react'
import placeholder from '../assets/placeholder.png'
import '../styles/Film.css'
import {Link} from 'react-router-dom'
function Film(props) {

  return (
    
    <div className = "film">
        <Link to={`/filmdetails/${props.title}`} state={{
            cover: props.cover,
            title: props.title,
            director: props.director,
            writer: props.writer,
            stars: props.stars,
            status: props.status,
            available: props.available,
            synopsis: props.synopsis,
            photos: props.photos,
            videos: props.videos
            }} ><img className = "filmImg" src = {placeholder} /></Link>
        <span className = "filmTitle"> {props.title} </span>
        <span className = "filmType">  FILM </span>
  </div>

  )
}

export default Film