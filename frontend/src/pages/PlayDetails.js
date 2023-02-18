import React from 'react'
import '../styles/PlayDetails.css'
import {useParams,useLocation} from 'react-router-dom'
import Photo from '../components/Photo'
import {useRef} from 'react'
import {useEffect, useState} from 'react'
import Popup from '../components/Popup'
import Video from '../components/Video'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function PlayDetails() {
  const {type} = useParams();
  const stateParamVal = useLocation().state;
console.log(type);
console.log(stateParamVal);

const [buttonPopup,setButtonPopup] = useState(false
  );
const [popupUrl,setPopupUrl] =useState('')


const scrollElement = useRef(null)

const scrollRight = () =>{
  scrollElement.current.scrollLeft = 
  scrollElement.current.scrollLeft + 1290
}

const scrollLeft = () =>{
  scrollElement.current.scrollLeft = 
  scrollElement.current.scrollLeft - 1290
}

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
const productions = stateParamVal.production.map(item => {
  return(
    <div>
      {item}
    </div>
  )
})
const developments = stateParamVal.development.map(item => {
  return(
    <div>
      {item}
    </div>
  )
})
  return (
    <div className = 'page'>
    <div className = 'playDetails'>

      <div className = 'left'>
        <img src={require(`../assets/${stateParamVal.cover}`)} className = 'playCoverImg' /> 
        <span className = 'production'> PRODUCTION 
          <span className = 'productionList'> {productions} </span>
        </span>
        <span className = 'development'> DEVELOPMENT
          <span className = 'developmentList'> {developments} </span>
        </span> 
      </div>

      <div className = 'right'> 
        <h1 className = 'playsTitle'>{stateParamVal.title}</h1>
        <p className = 'playSynopsis'> {stateParamVal.synopsis} </p>
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

export default PlayDetails