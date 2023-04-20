import React, {useState} from 'react'
import contactBackground from '../assets/contact_background.jpg'
import '../styles/Contact.css'
import validator from 'email-validator'
// import axios from 'axios'

function Contact() {

  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

   const handleFirstNameChange = (event) => {
     setFirstName(event.target.value)
   }

   const handleLastNameChange = (event) => {
     setLastName(event.target.value)
   }

   const handleEmailChange = (event) => {
     setEmail(event.target.value)
   }

   const handleMessageChange = (event) => {
     setMessage(event.target.value)
   }

   const handleSubmit = async (event) => {
     event.preventDefault();
     
     setError(null)
     console.log(email);
     await fetch('api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        message
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Email sent:', data);
    })
    .catch(error => {
      console.error('Error sending email:', error);
    });

    };
   

   return (
     <div className="page">
      <div className='banner-container'>
        <div className='banner-name'>
          <div className="banner">CONTACT US</div>
        </div>
        <img className='bannerImg' src={contactBackground}/>
      </div>
       <div className="contact-info">
         <h3>Contact Information:</h3>
         <p>123 Main Street</p>
         <p>Anytown, USA 12345</p>
         <p>Phone: (555) 555-5555</p>
       </div>
       <div className="agent-info">
         <h3>Agent:</h3>
         <p>John Doe</p>
         <p>123-456-7890</p>
       </div>
       <div className="contact-container" >
         <form className="contact-form" onSubmit={handleSubmit} >
           <div className="form-group input-row">
             <div className="first-name">
               <input type="text" id="firstName" name="firstName" placeholder="First Name*" onChange={handleFirstNameChange}/>
             </div>
             <div className="last-name">
                 <input type="text" id="lastName" name="lastName" placeholder="Last Name*" onChange={handleLastNameChange}/>
             </div>  
           </div>
           <div className="form-group">
             <input type="email" id="email" name="email" placeholder="Email Address*" onChange={handleEmailChange}  />
           </div>
           <div className="form-group">
             <textarea id="message" name="message" rows="10" placeholder="Message*" onChange={handleMessageChange}></textarea>
           </div>
           <button type="submit">Send</button>
         </form>
       </div>
     </div>
   )
}

export default Contact