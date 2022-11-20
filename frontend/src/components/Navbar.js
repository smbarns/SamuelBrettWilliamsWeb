import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <div className = "navbar">
       <div className ="links">
          <Link to ={"./Home"}>HOME</Link>
          <Link to ={"./Biography"}>BIOGRAPHY</Link>
          <Link to ={"./Films"}>FILMS</Link>
       </div>
       <div className = "title">
          SAMUEL BRETT WILLIAMS
       </div>
       <div className ="links">
          <Link to ={"./Plays"}>PLAYS</Link>
          <Link to ={"./Press"}>PRESS</Link>
          <Link to ={"./Contact"}>CONTACT</Link>
       </div>
      
    </div>
  )
}

export default Navbar