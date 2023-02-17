import React from 'react'
import '../styles/Home.css'
import {useEffect, useState} from 'react'
import data from '../sampleprojects.js'
import Project from '../components/Project'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useRef} from 'react'
import Popup from '../components/Popup'
import ReactPlayer from 'react-player'

function Home() {
  const [buttonPopup,setButtonPopup] = useState(false
    );
    const [popupUrl,setPopupUrl] =useState('')
  
 


  const [pic,setPic] = useState();
  // const [projects, setProjects] = useState([]); // fetch data from api into this state 
  //then use it .map instead of data.map

  const scrollElement = useRef(null)

  const scrollRight = () =>{
    scrollElement.current.scrollLeft = 
    scrollElement.current.scrollLeft + 1290
  }

  const scrollLeft = () =>{
    scrollElement.current.scrollLeft = 
    scrollElement.current.scrollLeft - 1290
  }
  const projectReel = data.map(item => {   // later data will be equal to the state variable that accepted the api data from the fetch request
    return(
      <Project
          key = {item.id}
          setButtonPopup = {setButtonPopup}
          setUrl = {setPopupUrl}
          {...item}
      />
    )
  })
 

 
useEffect(()=> {
  fetch('https://api.imgflip.com/get_memes')
    .then((response) => response.json())
    .then((data) =>
    setPic(data.data.memes[18].url))
},[])
 
 
 

 
 
  return (
    <div className = "page" >
    <div className = "home">
    <div className='player-wrapper'>
          <ReactPlayer
            className='react-player'
            url='https://vimeo.com/730047025'
            fluid = { false }
            width=  '100%'
            height= '100%'
            playing= {true}
            controls = {false}
            muted = {true}
            

          />
        </div>
      <div className = "about">  
          <div className = "aboutBody">
            <div>
            <h1>ABOUT</h1>
            <h2>Samuel Brett Williams is an award-winning playwright,<br />
          screenwriter, and director. His plays have been produced<br />
          everywhere form New York City to Moscow, Russia. He has<br />
          developed films and television shows for 26 Keys<br />
          Productions, Room 101, Character Brigade, Naked Faith<br />
          Entertainment, and Hot Snakes Media.
        </h2>
            </div>
     
        <img className = 'samImg' src = {pic} />
        </div>
      </div>
      <div className = 'upcomingProjects'>
        <div className = 'topReel'>
          <div className = 'reelText'>Upcoming Projects
           </div>
           <div className = 'arrows'>
           <ArrowBackIosIcon onClick = {scrollLeft} ></ArrowBackIosIcon>
           <ArrowForwardIosIcon onClick = {scrollRight}></ArrowForwardIosIcon>
           </div>
       
          </div>
        <div className = 'reel' ref = {scrollElement}>
          {projectReel}
         
          </div>
       
          <Popup url = {popupUrl} trigger = {buttonPopup}  setTrigger = {setButtonPopup} ></Popup>
       
      </div>
      <div>
      </div>
    </div>
 </div>
  )
}
 
export default Home

