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
		from: `<${process.env.FROM_EMAIL}>`,
		to: email,
		subject: 'New message from your website',
		html: emailBody,
	};

	console.log(emailOptions);

	const info = await transporter.sendMail(emailOptions);
	console.log(info);

	return info;
};

module.exports = recieveEmail;
