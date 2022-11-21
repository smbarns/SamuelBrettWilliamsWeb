import React from 'react'
import placeholder from '../assets/placeholder.png'
import '../styles/Play.css'
import {Link} from 'react-router-dom'
function Play(props) {

  return (
    
    <div className = "play">
        <Link to={`/details/${props.title}`} state={{
            title:props.title,
            photos:props.photos
            }} ><img className = "playImg" src = {placeholder} /></Link>
        <span className = "playTitle"> {props.title} </span>
        <span className = "playDuration">  10 minutes </span>
  </div>

  )
}

export default Play