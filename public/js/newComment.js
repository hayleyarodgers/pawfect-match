const sendComment = async (event) => {
	event.preventDefault();

    // const button = event.target;
    const pet = document.querySelector(".pet")
    const petId = pet.getAttribute("data-pet");
    const userComment = document.querySelector("#new-comment").value;

    const response = await fetch(`/api/comments/`, {
        method: 'POST',
        body: JSON.stringify({
            pet_id: petId,
            user_comment: userComment
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(
            'Failed to send a comment.'
        );
    }
};

document.querySelector("#send").addEventListener('click', sendComment);