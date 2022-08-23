const deletePet = async (event) => {
	event.preventDefault();
    const button = event.target;
    const petId = button.getAttribute("data-pet-id");
	
    const response = await fetch(`api/pets/${petId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(
            'Failed to delete pet for adoption.'
        );
    }
};

document.querySelectorAll('.delete-pet').forEach(function(button){
    button.addEventListener('click', deletePet);
});