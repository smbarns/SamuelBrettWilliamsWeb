import React from 'react'
import '../styles/Popup.css'
import CloseIcon from '@mui/icons-material/Close';
import ReactPlayer from 'react-player'



function Popup(props) {

  const toggleTrigger = () => {
    props.setTrigger(!props.trigger)
  }
  
  return (props.trigger) ? (
    <div className = "popup">
        <div className = "popup-inner">
            <button className = "close-btn"onClick ={() => toggleTrigger()} ><CloseIcon></CloseIcon> </button>
            <div className='popup-wrapper'>
          <ReactPlayer
            className='popup-player'
            url = {props.url}
            width='100%'
            height='100%'
            playing= {true}
            controls = {true}
            muted = {true}
            origin ='http://localhost:3000'
            
          />
        </div>
        </div>
    </div>
  ) : "";
}

export default Popup