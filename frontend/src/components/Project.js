import React from 'react'
import '../styles/Project.css'
import blank from '../assets/blank.jpg'
import play from '../assets/pbutton3.png'

function Project(props) {

    function popupBtn(){
        props.setButtonPopup(true)
         
        props.setUrl(props.videos[0].video)
    }

  return (
    <div className = "imgContainer">
    <button className = "playButton"  onClick  = {() =>popupBtn() }></button>
      <img className = 'blank' src = {props.photo}/>
      <span className = 'caption'>{props.title.toUpperCase()}</span>
      </div>
  )
}

export default Project