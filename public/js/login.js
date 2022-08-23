const loginFormHandler = async (event) => {
	event.preventDefault();

	// Collect values from the login form
<<<<<<< HEAD
	const email = document.querySelector('#username-login').value.trim();
=======
	const email = document.querySelector('#email-login').value.trim();
>>>>>>> 2a0be4eb52924af475e8888730a779cfb7d7523a
	const password = document.querySelector('#password-login').value.trim();

	if (email && password) {
		// Send a POST request to the API endpoint
		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

<<<<<<< HEAD
		console.log(response);

=======
>>>>>>> 2a0be4eb52924af475e8888730a779cfb7d7523a
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
<<<<<<< HEAD
	const username = document.querySelector('#username-signup').value.trim();
	const email = document.querySelector('#email-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	if (username && email && password) {
		// Send a POST request to the API endpoint
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ username, email, password }),
=======
	const name = document.querySelector('#name-signup').value.trim();
	const email = document.querySelector('#email-signup').value.trim();
	const password = document.querySelector('#password-signup').value.trim();

	if (name && email && password) {
		// Send a POST request to the API endpoint
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ name, email, password }),
>>>>>>> 2a0be4eb52924af475e8888730a779cfb7d7523a
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// If successful, redirect the browser to the pets for adoption page
<<<<<<< HEAD
			document.location.replace('/adoptpets');
=======
			document.location.replace('/pets');
>>>>>>> 2a0be4eb52924af475e8888730a779cfb7d7523a
		} else {
			alert(response.statusText);
		}
	}
};

document
<<<<<<< HEAD
	.querySelector('#login-button')
	.addEventListener('click', loginFormHandler);

document
	.querySelector('#signup-button')
	.addEventListener('click', signupFormHandler);
=======
	.querySelector('.login-form')
	.addEventListener('submit', loginFormHandler);

document
	.querySelector('.signup-form')
	.addEventListener('submit', signupFormHandler);
>>>>>>> 2a0be4eb52924af475e8888730a779cfb7d7523a
