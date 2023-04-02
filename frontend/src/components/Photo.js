import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import '../styles/Photo.css';

function Photo(props) {
  const [trigger, setTrigger] = useState(false);

  const toggleTrigger = () => {
    setTrigger(!trigger);
  }

  const handleImgClick = () => {
    setTrigger(true);
  }

  return (
    <div className='photo'>
      <div className='imgContainer-photo'>
        <img src={props.photo} onClick = {() => handleImgClick()}/>
      </div>
      {trigger ? (
        <div className = "popup">
          <div className = "popup-inner-photo">
              <button className = "close-btn" onClick ={() => toggleTrigger()} >{<FontAwesomeIcon icon={faXmark} size="xl" />} </button>
              <div className='popup-photo'>
                <img src={props.photo} />
              </div>
          </div>
        </div>
      ) : ('')}
    </div>
  )
}

export default Photo