import React, { useState } from "react";
import axios from "axios";

import '../styles/ForgotPassword.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);
			await axios.post('http://localhost:3000/api/forgot-password', { email });
			setMessage('Password reset email sent');
			setLoading(false);
		} catch (err) {
			setMessage(console.log(err.message));
		}
	};

  return (
		<div className='forgot-password'>
			<h2>Forgot Password</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor='email'>Email:</label>
				<input
					type='email'
					id='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Please enter your email here'
				/>
				<button type='submit'>{loading ? 'Sending...' : 'Submit'}</button>
			</form>
			{message && <p>{message}</p>}
		</div>
	);
}
