import React, { useState, useEffect } from 'react'
import '../styles/Video.css'
import blank from '../assets/blank.jpg'
import ReactPlayer from 'react-player'
function Video(props) {

  function popupBtn(){
    props.setButtonPopup(true);
    props.setUrl(props.url);
  }

  const config = {
    file: {
      attributes: {
        controlsList: 'nodownload', // disables download button for some browsers
      },
    },
    // disables right-click context menu on video
    disableContextMenu: true,
  };

  return (
    <div className = "video">
      <div className = "imgContainer-video">
      <div className = 'blank' style={{backgroundColor: '#240f0e',}}/>
      <ReactPlayer
            className='react-player'
            url={props.url}
            width = '100%'
            height = '100%'
            fluid = { false }
            playing= {false}
            controls = {false}
            muted = {true}
            config = {config}
            style={{ pointerEvents: 'none' }}
          />
        <button className = "playButton"  onClick  = {() =>popupBtn() }></button>
      </div>
    </div>
  )
}

export default Video