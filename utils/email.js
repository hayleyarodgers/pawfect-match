require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

//This function creates a new refresh token for each request:
const createTransporter = async () => {
	const oauth2Client = new OAuth2(
		process.env.OAUTH_CLIENTID,
		process.env.OAUTH_CLIENT_SECRET,
		'https://developers.google.com/oauthplayground'
	);

	oauth2Client.setCredentials({
		refresh_token: process.env.OAUTH_REFRESH_TOKEN,
	});

	const accessToken = await new Promise((resolve, reject) => {
		oauth2Client.getAccessToken((err, token) => {
			if (err) {
				reject('Failed to create access token :(');
			}
			resolve(token);
		});
	});

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			type: 'OAuth2',
			user: process.env.MAIL_USERNAME,
			accessToken,
			clientId: process.env.OAUTH_CLIENTID,
			clientSecret: process.env.OAUTH_CLIENT_SECRET,
			refreshToken: process.env.OAUTH_REFRESH_TOKEN,
		},
	});
	return transporter;
};

//emailOptions - who sends what to whom
const sendEmail = async (emailOptions) => {
	let emailTransporter = await createTransporter();
	await emailTransporter.sendMail({
		...emailOptions,
		from: process.env.MAIL_USERNAME,
		subject: `Welcome to Pawfect Match!`,
		function(error, info) {
			if (error) {
				return console.log(error);
			}
			console.log('Message sent: ' + info.response);
		},
	});
};

// These variables should come in handy when we create the notification emails.
const userEmail = 'vkellyy@gmail.com'; //add your email here to test, this will become the user that is logged in.
const emailSubject = 'Test';
const emailText = 'I am sending an email from nodemailer!';

// //The email text, subject, and recipient:
// sendEmail({
// 	subject: emailSubject,
// 	text: emailText,
// 	to: userEmail,
// 	from: process.env.MAIL_USERNAME,
// });

module.exports = { sendEmail };
