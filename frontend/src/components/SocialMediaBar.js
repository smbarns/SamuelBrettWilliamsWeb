import React from 'react'
import {Link} from 'react-router-dom'
import '../styles/Navbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";
import '../styles/SocialMediaBar.css'

function SocialMediaBar() {
    return (
        <div class='socialBar'>
            <div className='links'>
                <a href = "https://www.facebook.com/samuel.b.williams.18" className = "facebook social">
                    <FontAwesomeIcon icon = {faFacebook} size = "1x" />
                </a>
                //<a href = "https://www.Twitter.com" className = "twitter social">
                //    <FontAwesomeIcon icon = {faTwitter} size = "1x" />
                //</a>
                <a href = "https://www.instagram.com/samuelbrett44/" className = "instagram social">
                    <FontAwesomeIcon icon = {faInstagram} size = "1x" />
                </a>
                //<a href = "https://www.youtube.com" className = "youtube social">
                //    <FontAwesomeIcon icon = {faYoutube} size = "1x" />
                //</a>

            </div>

        </div>
    )
}

export default SocialMediaBar;  