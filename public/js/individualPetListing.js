const newCommentHandler = async (event) => {
	event.preventDefault();

	const comment = document.querySelector('#new-comment').value.trim();

	if (comment) {
		const response = await fetch(``, {
			method: 'POST',
			body: JSON.stringify({ comment }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			// comment needs to add to list of existing comments; unsure if reloading is the way to approach this yet
			document.location.reload();

			// send email notification
		} else {
			alert('Failed to add comment.');
		}
	}
};
