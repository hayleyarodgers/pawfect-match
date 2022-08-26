const loginFormHandler = async (event) => {
	event.preventDefault();

	// Collect values from the login form
	const email = document.querySelector('#email-login').value.trim();
	const password = document.querySelector('#password-login').value.trim();

	if (email && password) {
		// Send a POST request to the API endpoint
		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// If successful, redirect the browser to their dashboard
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	}
};

const signupFormHandler = async (event) => {
	event.preventDefault();

	// Collect values from the sign up form
	const username = document.querySelector('#username-signup').value.trim();
	const email = document.querySelector('#email-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	if (username && email && password) {
		// Send a POST request to the API endpoint
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ username, email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// If successful, redirect the browser to the pets for adoption page
			document.location.replace('/adoptpets');
		} else {
			alert(response.statusText);
		}
	}
};

document
	.querySelector('#login-button')
	.addEventListener('click', loginFormHandler);

document
	.querySelector('#signup-button')
	.addEventListener('click', signupFormHandler);
