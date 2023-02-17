import React from 'react'
import '../styles/PlayDetails.css'
import {useParams,useLocation} from 'react-router-dom'
import Photo from '../components/Photo'


function PlayDetails() {
  const {type} = useParams();
  const stateParamVal = useLocation().state;
console.log(type);
console.log(stateParamVal);


const photoReel = stateParamVal.photos.map(item => {
  return(
    <Photo
      photo = {item}
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
    </div> 
  )
}

export default PlayDetails