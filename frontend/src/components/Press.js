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
            }} ><img className = "press_image" src = {placeholder} alt=""  /></Link>
        <span classname = "press_title"> title goes here </span>
        <span classname = "quote"> insert the quotes </span>
        <span className = "author"> {props.title} </span>
        <span className = "press_link">  LinkLonk </span>
  </div>

  )
}

export default Press
