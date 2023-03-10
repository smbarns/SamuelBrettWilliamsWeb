import React from 'react'
import '../styles/Home.css'
import {useEffect, useState} from 'react'
import dataSP from '../sampleprojects.js'
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

  const [data,setData] = useState(null);
  const [pic,setPic] = useState();
  const [desc,setDesc] = useState();
  const [projs,setProjects] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const scrollElement = useRef(null)

  const scrollRight = () =>{
    scrollElement.current.scrollLeft = 
    scrollElement.current.scrollLeft + 1700
  }

  const scrollLeft = () =>{
    scrollElement.current.scrollLeft = 
    scrollElement.current.scrollLeft - 1700
  }

 
 
useEffect(() => {
  fetch('http://localhost:3000/api/homepage')
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw response;
    })
    .then(data => {
      setData(data);
      setPic(data[0].client_photo);
      setDesc(data[0].about_des);
      setProjects(data[0].films)
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    })
}, [])


 
if (loading) return <div className="page">Loading...</div>;
if (error) return <div className="page">Error!</div>;
console.log(data)
console.log(projs)

const projectReel = projs.map(item => {   // later data will be equal to the state variable that accepted the api data from the fetch request
  return(
    <Project
        key = {item.id}
        setButtonPopup = {setButtonPopup}
        setUrl = {setPopupUrl}
        {...item}
    />
  )
})
console.log(data.Films)

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
            <h2 className = "clientDesc">
              {desc}
            </h2>
            </div>
     
        <img className = 'samImg' src = {pic} />
        </div>
      </div>
      <div className = 'upcomingProjects'>
        <div className = 'topReel'>
          <div className = 'reelText'>UPCOMING PROJECTS
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

