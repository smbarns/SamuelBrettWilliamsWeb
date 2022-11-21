import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebookF,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import '../styles/SocialMediaBar.css'

function SocialMediaBar() {
    return (
        <div className='socialBar'>
            <div className='links'>
            <a href = "https://www.Twitter.com" className = "icons">
                    <FontAwesomeIcon icon = {faTwitter}/>
                    </a>
                <a href = "https://www.facebook.com/samuel.b.williams.18" className = "icons">
                    <FontAwesomeIcon icon = {faFacebookF}/>
                </a>
                <a href = "https://www.instagram.com/samuelbrett44/" className = "icons">
                    <FontAwesomeIcon icon = {faInstagram}/>
                </a>
                <a href = "https://www.youtube.com" className = "icons">
                    <FontAwesomeIcon icon = {faYoutube}/>
                    </a>
            </div>

        </div>
    )
}

export default SocialMediaBar;  