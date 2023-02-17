import React from 'react'
import '../styles/FilmDetails.css'
import {useParams,useLocation} from 'react-router-dom'
import Photo from '../components/Photo'
import amazon from '../assets/amazonlogo.png'
import hulu from '../assets/hululogo.png'
import itunes from '../assets/ituneslogo.png'
import vudu from '../assets/vudulogo.png'

function FilmDetails() {
  const {type} = useParams();
  const stateParamVal = useLocation().state;
console.log(type);
console.log(stateParamVal);
console.log(stateParamVal.photos);
console.log(stateParamVal.cover)

const photoReel = stateParamVal.photos.map(item => {
  return(
    <Photo
      photo = {item}
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
    </div>
  )
}

export default FilmDetails