import React from 'react'
import '../styles/Home.css'
import sam from '../assets/sam.jpg'

function Home() {
  return (
    <div className = "home">
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
      
        <img className = 'samImg' src = {sam} />
        </div>
    
        
      </div>
    </div>
 
  )
}

export default Home