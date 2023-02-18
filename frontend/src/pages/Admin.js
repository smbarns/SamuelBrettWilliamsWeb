

import React from "react"

import '../styles/Admin.css'
const Admin =()=>{
    return (
        <section className='admin'>
            <div className="admin__content">
                <h3 className="admin__title">Admin Login</h3>
                <form className="admin__form">
                    <input className="admin__input admin__input--email" placeholder="Username or Email Address" />
                    <input className="admin__input admin__input--password" placeholder="Password" />
                    <div className="admin__form-actions">
                    <button className="btn btn-submit">Login</button>
                    <a href='/forgot password'>Forgot password</a>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Admin
