import React from 'react'
import '../styles/Press.css'
import banner_img from '../assets/press-bg.jpg'

function Press() {
  return (

    <div className = "press">
      <div class="test"><img className = 'bannerImg' src = {banner_img} /></div>
        <div className = "pressBanner">
        PRESS
        </div>
      </div>
  )
}

export default Press