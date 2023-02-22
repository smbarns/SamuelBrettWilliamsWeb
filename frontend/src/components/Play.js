import React from 'react'
import placeholder from '../assets/placeholder.png'
import '../styles/Play.css'
import {Link} from 'react-router-dom'
function Play(props) {

  return (
    
    <div className = "play">
        <Link to={`/playdetails/${props.title}`} state={{
            title: props.title,
            cover: props.cover,
            photos: props.photos,
            duration: props.duration,
            synopsis: props.synopsis,
            production: props.production,
            development: props.development,
            info: props.info,
            videos: props.videos,
            }} ><img className = "playImg" src = {placeholder} /></Link>
        <span className = "playTitle"> {props.title} </span>
        <span className = "playDuration"> {props.duration} </span>
  </div>

  )
}

export default Play