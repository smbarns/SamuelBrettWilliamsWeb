import React from 'react'
import '../styles/FilmDetails.css'
import {useParams,useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Popup from '../components/Popup'
import Video from '../components/Video'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import Photo from '../components/Photo'
import {useRef} from 'react'

function FilmDetails() {
  const {type} = useParams();
  const stateParamVal = useLocation().state;
  console.log(type);
  console.log(stateParamVal);
  console.log(stateParamVal.photos);
  console.log(stateParamVal.cover)

  const [buttonPopup, setButtonPopup] = useState(false);
  const [popupUrl, setPopupUrl] = useState('')

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
        photo = {item.photo}
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
      <div className='filmlink'>
        <a href={item.link}>
          <img src={item.link_photo} />
        </a>
      </div>
    )
  })

  return (
    <div className = 'page'>
      <div className = 'filmDetails'>
        <div className = 'left'>
          <img src={stateParamVal.cover} className = 'filmCoverImg' />
        </div>

        <div className = 'right'>
          <h1 className = 'filmsTitle'>{stateParamVal.title} </h1>
          <span className = 'director'> Director: {stateParamVal.director} </span>
          <span className = 'writer'> Writer: {stateParamVal.writer} </span>
          <span className = 'stars'> Stars: {stateParamVal.stars} </span>
          <span className = 'status'> Status: {stateParamVal.status} </span>
          <span className='film_avaliable'>Avaliable On:</span>
          <div className='film_links'>
            {buy_links}
          </div>
          <p className = 'filmSynopsis'> {stateParamVal.synopsis} </p>
        </div>
      </div>

      <div className = 'filmReel'>
        <div className = 'filmTopReel'>
          <div className = 'filmVideoReelText'>VIDEOS</div>
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

      <div className = 'filmReel'>
        <div className = 'filmTopReel'>
          <div className = 'filmPhotoReelText'>PHOTOS</div>
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

export default FilmDetails