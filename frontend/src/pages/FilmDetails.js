import React from 'react'
import '../styles/FilmDetails.css'
import {useParams,useLocation} from 'react-router-dom'
import {useEffect, useState} from 'react'
import Popup from '../components/Popup'
import Video from '../components/Video'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Photo from '../components/Photo'
import amazon from '../assets/amazonlogo.png'
import hulu from '../assets/hululogo.png'
import itunes from '../assets/ituneslogo.png'
import vudu from '../assets/vudulogo.png'
import {useRef} from 'react'

function FilmDetails() {
  const {type} = useParams();
  const stateParamVal = useLocation().state;
console.log(type);
console.log(stateParamVal);
console.log(stateParamVal.photos);
console.log(stateParamVal.cover)

const scrollElement = useRef(null)

const scrollRight = () =>{
  scrollElement.current.scrollLeft = 
  scrollElement.current.scrollLeft + 1290
}

const scrollLeft = () =>{
  scrollElement.current.scrollLeft = 
  scrollElement.current.scrollLeft - 1290
}

const [buttonPopup,setButtonPopup] = useState(false
  );
const [popupUrl,setPopupUrl] =useState('')


const photoReel = stateParamVal.photos.map(item => {
  return(
    <Photo
      photo = {item}
    />
  )
})

const videoReel = stateParamVal.videos.map(item => {   // later data will be equal to the state variable that accepted the api data from the fetch request
  return(
    <Video
        setButtonPopup = {setButtonPopup}
        setUrl = {setPopupUrl}
        url = {item}
    />
  )
})
const platforms = stateParamVal.available.map(item => {
  return(
    <Photo
      photo = {item}
    />
  )
})

  return (
    <div className = 'page'>
    <div className = 'filmDetails'>
      <div className = 'left'>
         <img src={require(`../assets/${stateParamVal.cover}`)} className = 'filmCoverImg' />
      </div>

      <div className = 'right'>
      
        <h1 className = 'filmsTitle'>{stateParamVal.title} </h1>
        <span className = 'director'> Director: {stateParamVal.director} </span>
        <span className = 'writer'> Writer: {stateParamVal.writer} </span>
        <span className = 'stars'> Stars: {stateParamVal.stars} </span>
        <span className = 'status'> Status: {stateParamVal.status} </span>
        <div className = 'platforms'> Available on:  
          <div className = 'logos'>
            <img src = {hulu} className = 'logo'/>
            <img src = {amazon} className = 'logo'/>
            <img src = {itunes} className = 'logo'/>
            <img src = {vudu} className = 'logo'/>
          </div>
        </div> 
        <p className = 'filmSynopsis'> {stateParamVal.synopsis} </p>
      </div>
      {/* <div className = 'photoReel'>
      {photoReel}
      </div> */}
    </div>
    <div className = 'detailPageVideos'>
        <div className = 'topReel'>
          <div className = 'reelText'>Videos
          </div>
          <div className = 'arrows'>
            <ArrowBackIosIcon onClick = {scrollLeft} ></ArrowBackIosIcon>
            <ArrowForwardIosIcon onClick = {scrollRight}></ArrowForwardIosIcon>
          </div>
        </div>
        <div className = 'reel'>
        {videoReel}
        </div>
      </div>
      <Popup url = {popupUrl} trigger = {buttonPopup}  setTrigger = {setButtonPopup} ></Popup>
    </div>
  )
}

export default FilmDetails