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
import Authenticate from '../components/Authenticate.js';
import PlusIcon from '../assets/add-icon.png';
import UpcomingAddPopup from '../components/UpcomingAddPopup'

function Home() {
  const [buttonPopup,setButtonPopup] = useState(false);
  const [popupUrl,setPopupUrl] =useState('');
  const [upcomingAdd, setUpcomingAdd] = useState(false);
  const [filmSelect, setFilmSelect] = useState(false);

  const [data,setData] = useState(null);
  const [pic,setPic] = useState();
  const [desc,setDesc] = useState();
  const [projs,setProjects] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authenticated, setAuthenticated] = useState()


  const scrollElement = useRef(null)

  const scrollRight = () =>{
    scrollElement.current.scrollLeft = 
    scrollElement.current.scrollLeft + 1700
  }

  const scrollLeft = () =>{
    scrollElement.current.scrollLeft = 
    scrollElement.current.scrollLeft - 1700
  }

  function upcomingPopup(){
    setUpcomingAdd(true);
    setFilmSelect(true);
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
      setProjects(data[0].films.reverse());
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
          <div className = 'reelText'>FEATURED PROJECTS
           </div>
           <div className = 'arrows'>
           <ArrowBackIosIcon onClick = {scrollLeft} ></ArrowBackIosIcon>
           <ArrowForwardIosIcon onClick = {scrollRight}></ArrowForwardIosIcon>
           </div>
       
        </div>
        <div className = 'reel' ref = {scrollElement}>
          <Authenticate setAuthen={setAuthenticated}/>
          {authenticated ? (
              <div className="imgContainer">
                <div className="blank-add">
                  <button className="addButton" onClick={() => upcomingPopup()}>
                    <img src = {PlusIcon}></img></button>
                </div>
              </div>
            ) : (null)}
          {projectReel}
        </div>

        {authenticated ? (
          <UpcomingAddPopup trigger={upcomingAdd}  setTrigger={setUpcomingAdd} filmSelect={filmSelect} setFilmSelect={setFilmSelect}></UpcomingAddPopup>
        ) : (null)}

        <Popup url={popupUrl} trigger={buttonPopup}  setTrigger={setButtonPopup} ></Popup>
        {console.log(popupUrl)}
       
      </div>
      <div>
      </div>
    </div>
 </div>
  )
}
 
export default Home

