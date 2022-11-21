import React from 'react'
import '../styles/Project.css'
import blank from '../assets/blank.jpg'
import play from '../assets/pbutton3.png'

function Project(props) {

    function popupBtn(){
        props.setButtonPopup(true
          )
         
        props.setUrl(props.url)
    }

console.log(props.url)
  return (
    <div className = "imgContainer">
    <button className = "playButton"  onClick  = {() =>popupBtn() }>
      <img src = {play}></img></button>
      <img className = 'blank' src = {blank}/>
      <span className = 'caption'>File Name {props.id}</span>
      </div>
  )
}

export default Project