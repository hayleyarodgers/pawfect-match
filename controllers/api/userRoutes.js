const router = require('express').Router();
const { User } = require('../../models');
require('dotenv').config();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

router.post('/', async (req, res) => {
	try {
		const userData = await User.create(req.body);
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;
			res.status(200).json(userData);
		});
		console.log('req.body.email', req.body.email);
		// This sends a confirmation of signup email to the user.
		sendEmail({
			text: `Hello ${req.body.username}! Thank you for signing up! Pawfect Match is the online destination matching pets in need of a new home with their forever family. We hope you find your Pawfect Match!`,
			to: req.body.email,
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({
			where: { email: req.body.email },
		});

		if (!userData) {
			res.status(400).json({
				message: 'Incorrect email or password, please try again',
			});
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({
				message: 'Incorrect email or password, please try again',
			});
			return;
		}

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.json({ user: userData, message: 'You are now logged in!' });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;

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
