const newPetHandler = async (event) => {
	event.preventDefault();

	const name = document.querySelector('#pet-name').value.trim();
	const location = document.querySelector('#pet-location').value.trim();
	const type = document.querySelector('#pet-type').value;
	const breed = document.querySelector('#pet-breed').value.trim();
	const sex = document.querySelector('#pet-sex').value;
	const size = document.querySelector('#pet-size').value;
	const colour = document.querySelector('#pet-colour').value.trim();
	const birthday = document.querySelector('#pet-birthday').value.trim();
	const personality = document.querySelector('#pet-personality').value.trim();
	const photo = document.querySelector('#pet-photo').value;

	if (
		name &&
		location &&
		type &&
		breed &&
		sex &&
		size &&
		colour &&
		birthday &&
		personality &&
		photo
	) {
		const response = await fetch(`api/pets`, {
			method: 'POST',
			body: JSON.stringify({
				name,
				location,
				type,
				breed,
				sex,
				size,
				colour,
				birthday,
				personality,
				photo,
			}),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/dashboard');
		} else {
			alert(
				'Failed to post pet for adoption. Please make sure you have filled in all fields.'
			);
		}
	}
};

document.querySelector('#post-button').addEventListener('click', newPetHandler);
