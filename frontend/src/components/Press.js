import React from 'react'
import placeholder from '../assets/placeholder.png'
import '../styles/PressDetails.css'
import {Link} from 'react-router-dom'
function Press(props) {

  return (
    
    <div className = "press">
        <Link to={`/pressdetails/${props.title}`} state={{
            title:props.title,
            photos:props.photos,
            author:props.author,
            quote:props.quote,
            link:props.Link
            }} ><img className = "press_image" src = {props.photos} alt=""  /></Link>
        <span classname = "press_title"> {props.title} </span>
        <span classname = "quote"> {props.quote} </span>
        <span className = "author"> {props.author} </span>
        <span className = "press_link">  {props.Link} </span>
  </div>

  )
}

export default Press
