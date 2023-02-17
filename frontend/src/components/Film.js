import React from 'react'
import placeholder from '../assets/placeholder.png'
import '../styles/Film.css'
import {Link} from 'react-router-dom'
function Film(props) {

  return (
    
    <div className = "film">
        <Link to={`/details/${props.title}`} state={{
            title:props.title,
            photos:props.photos
            }} ><img className = "filmImg" src = "http://localhost:3000/plays/getImage/{props.title}" /></Link>
        <span className = "filmTitle"> {props.title} </span>
        <span className = "filmType">  FILM </span>
  </div>

  )
}

export default Film