

import React, {useState} from "react"
import '../styles/Admin.css'
import axios from "axios";

const Admin =()=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("hello")
    try {
      const response = await axios.post("http://localhost:3000/api/admin", { email, password })
      .then(function(response){
        console.log(response);
        
      })
    } catch (error) {
      console.log("error123")
      console.error(error);
      setError(error.response.data.error);
    }
  };

    return (
        <section className='admin'>
            <div className="admin__content">
                <h3 className="admin__title">Admin Login</h3>
                <form className="admin__form" onSubmit={handleSubmit}>
                    <input className="admin__input admin__input--email" placeholder="Username or Email Address" type="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <input className="admin__input admin__input--password" placeholder="Password" type = "password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <div className="admin__form-actions">
                    <button className="btn btn-submit" type="submit" >Login</button>
                    <a href='/forgot password'>Forgot password</a>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Admin
