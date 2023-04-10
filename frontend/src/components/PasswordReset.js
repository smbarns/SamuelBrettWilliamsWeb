import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// import axios from 'axios';

import '../styles/PasswordReset.css';

const PasswordReset = () => {
	const [password, setPassword] = useState();
	const [passwordConfirm, setPasswordConfirm] = useState();
	const [notMatched, setNotMatched] = useState(false);
	const [error, setError] = useState('');

	const [searchParams, setSearchParams] = useSearchParams();
	const [message, setMessage] = useState('');

	let token = console.log(searchParams.get('token'));

	const passwordConfirmHandler = (e) => {
		if (e.target.value !== password) {
			setNotMatched(true);
		} else {
			setNotMatched(false);
		}
		setPasswordConfirm(e.target.value);
	};

	const submitHandler = async (e) => {
		e.preventDefault();

		// const resopnse = await axios.post(
		// 	'http://localhost:3000/api/reset-password',
		// 	{
		// 		token: searchParams.get('token'),
		// 		password,
		// 	}
		// );
		// console.log(resopnse);
		setMessage('Password Changed');
	};
	return (
		<section className='password-reset'>
			<div className='password-reset__content'>
				<h2>Password Reset</h2>

				<form className='password-reset__form' onSubmit={submitHandler}>
					<input
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						placeholder='New password'
					/>
					<input
						type='password'
						onChange={passwordConfirmHandler}
						placeholder='confirm new password'
					/>

					{notMatched && (
						<label className='reset-password__notmatched'>
							Password does not match!..
						</label>
					)}

					<button type='submit'>Submit</button>

					<h5>{message}</h5>
				</form>
			</div>
		</section>
	);
};

export default PasswordReset;
