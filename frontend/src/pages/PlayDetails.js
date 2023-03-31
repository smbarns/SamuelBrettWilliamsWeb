import React from 'react'
import '../styles/PlayDetails.css'
import {useParams,useLocation} from 'react-router-dom'
import Photo from '../components/Photo'
import {useRef} from 'react'
import {useEffect, useState} from 'react'
import Popup from '../components/Popup'
import Video from '../components/Video'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

function PlayDetails() {
  const {type} = useParams();
  const stateParamVal = useLocation().state;
  console.log(type);
  console.log(stateParamVal);

  const [buttonPopup,setButtonPopup] = useState(false);
  const [popupUrl,setPopupUrl] =useState('');

  const scrollElementVid = useRef(null);
  const scrollElementPhoto = useRef(null);

  const scrollRight = (reelRef) =>{
    reelRef.current.scrollLeft = 
    reelRef.current.scrollLeft + 1290
  }

  const scrollLeft = (reelRef) =>{
    reelRef.current.scrollLeft = 
    reelRef.current.scrollLeft - 1290
  }

  const reversedPhotos = stateParamVal.photos.reverse();
  const photoReel = reversedPhotos.map(item => {
    return(
      <Photo
        photo = {item}
      />
    )
  })

  const reversedVids = stateParamVal.videos.reverse();
  const videoReel = reversedVids.map(item => {   // later data will be equal to the state variable that accepted the api data from the fetch request
    return(
      <Video
          setButtonPopup = {setButtonPopup}
          setUrl = {setPopupUrl}
          url = {item.video}
      />
    )
  })

  const buy_links = stateParamVal.buy_links.map(item => {
    return(
      <div className='playlink'>
        <a href={item.link}>
          <img src={item.link_photo} />
        </a>
      </div>
    )
  })

  return (
    <div className = 'page'>
      <div className = 'playDetails'>

        <div className = 'left'>
          <img src={stateParamVal.cover} className = 'playCoverImg' /> 
        </div>

        <div className = 'right'> 
          <h1 className = 'playsTitle'>{stateParamVal.title}</h1>
          <span className = "play-writer"> Writer: 
            <span> {stateParamVal.writer} </span>
          </span>
          <span className = 'production'> Productions:
            <span> {stateParamVal.production} </span>
          </span>
          <span className = 'development'> Development:
            <span> {stateParamVal.development} </span>
          </span>
          <span className='play_avaliable'>Avaliable On:</span>
          <div className='play_links'>
            {buy_links}
          </div>
          <p className = 'playSynopsis'> {stateParamVal.synopsis} </p>
        </div>
      </div>
    
      <div className = 'playReel'>
        <div className = 'playTopReel'>
          <div className = 'playVideoReelText'>VIDEOS</div>
          <div className = 'arrows'>
            <FontAwesomeIcon icon={faAngleLeft} size="lg" style={{ marginRight: '18px' }} onClick = {() => scrollLeft(scrollElementVid)}/>
            <FontAwesomeIcon icon={faAngleRight} size="lg" onClick = {() => scrollRight(scrollElementVid)}/>
          </div>
        </div>
        <div className = 'vidReel' ref = {scrollElementVid}>
          {videoReel}
        </div>
      </div>
      <Popup url = {popupUrl} trigger = {buttonPopup}  setTrigger = {setButtonPopup} ></Popup>

      <div className = 'playReel'>
        <div className = 'playTopReel'>
          <div className = 'playPhotoReelText'>PHOTOS</div>
          <div className = 'arrows'>
            <FontAwesomeIcon icon={faAngleLeft} size="lg" style={{ marginRight: '18px' }} onClick = {() => scrollLeft(scrollElementPhoto)}/>
            <FontAwesomeIcon icon={faAngleRight} size="lg" onClick = {() => scrollRight(scrollElementPhoto)}/>
          </div>
        </div>
        <div className = 'photoReel' ref = {scrollElementPhoto}>
          {photoReel}
        </div>
      </div> 
    </div>
  )
}

export default PlayDetails