import React from 'react'
import '../styles/PressDetails.css'
function Press(props) {

  return (
    
    <div className = "pressIcon">
        {props.press_image ? <img className = "press_image" src = {props.press_image} alt=""/> : <span className="press_title"> {props.press_title} </span>}
        <span className = "project_title"> {props.project_name.toUpperCase()} </span>
        <span className = "quote"> "{props.quote}" </span>
        <span className = "author"> {props.author} </span>
  </div>

  )
}

export default Press
