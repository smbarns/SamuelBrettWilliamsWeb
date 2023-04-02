import React from 'react'
import '../styles/Details.css'
import {useParams,useLocation} from 'react-router-dom'
import Photo from '../components/Photo'
function Details() {
  const {type} = useParams();
  const stateParamVal = useLocation().state;
console.log(type);
console.log(stateParamVal);
console.log(stateParamVal.photos);

const photoReel = stateParamVal.photos.map(item => {
  return(
    <Photo
      photo = {item}
    />
  )
})
  return (
    <div>
      {stateParamVal.title}
      <div className = 'photoReel'>
      {photoReel}
      </div>

      </div>
  )
}

export default Details