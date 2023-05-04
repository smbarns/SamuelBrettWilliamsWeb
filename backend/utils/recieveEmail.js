const nodemailer = require('nodemailer');

const recieveEmail = async ({email, firstName, lastName, message}) => {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		port: process.env.SMTP_PORT,
		secure: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASSWORD,
		},
	});

	const emailBody = `
		<p><strong>Name:</strong> ${firstName} ${lastName}</p>
		<p><strong>Email:</strong> ${email}</p>
		<p><strong>Message:</strong></p>
		<p>${message}</p>
	`;

	const emailOptions = {
		from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
		to: `${process.env.SMTP_USER}`,
		subject: 'New message from your website',
		html: emailBody,
	};

	try {
		const info = await transporter.sendMail(emailOptions);
		return info;
	} catch (error) {
		console.log(error);
		throw new Error('Error sending email');
	}
};

module.exports = recieveEmail;
