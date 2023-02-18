import React from 'react'
import '../styles/Video.css'
import blank from '../assets/blank.jpg'
import play from '../assets/pbutton3.png'
import ReactPlayer from 'react-player'
function Video(props) {
    
    function popupBtn(){
        props.setButtonPopup(true
          )
         
        props.setUrl(props.url)
    }

console.log(props.url)
  return (
    <div className = "video">
    <div className = "imgContainer">
      <img className = 'blank' src = {blank}/>
      <ReactPlayer
            className='react-player'
            url={props.url}
            fluid = { false }
            width=  '100%'
            height= '100%'
            playing= {false}
            controls = {false}
            muted = {true}
      
          />
          
          <button className = "playButton"  onClick  = {() =>popupBtn() }>
      <img src = {play}></img></button>
      </div>
      </div>
  )
}

export default Video