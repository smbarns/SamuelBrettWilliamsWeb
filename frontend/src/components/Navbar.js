import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Navbar.css'

function Navbar() {
  return (
    <div className = "navbar">
       <div className ="links">
          <Link to ="">HOME</Link>
          <Link to ="biography">BIOGRAPHY</Link>
          <Link to ="plays">PLAYS</Link>
       </div>
       <div className = "title">
          SAMUEL BRETT WILLIAMS
       </div>
       <div className ="links">
          <Link to ="films">FILMS</Link>
          <Link to ="press">PRESS</Link>
          <Link to ="contact">CONTACT</Link>
          <Link to ="admin_login">ADMIN</Link>
       </div>
      
    </div>
  )
}

export default Navbar