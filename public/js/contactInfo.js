const contactForm = document.getElementById('modalSubscriptionForm');
const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', function (e) {
    e.preventDefault();

    const name = contactForm.querySelector('[name="name"]').value;
    const phoneNumber = contactForm.querySelector('[name="phoneNumber"]').value;

    // Save the name as the key and the phone number as the value
    const contactsRef = firebase.database().ref('contacts/number');
    contactsRef.child(name).set(phoneNumber)
        .then(() => {
            // Data saved successfully
            alert('Contact saved successfully.');
            // Clear the form
            location.reload();
        })
        .catch(error => {
            console.error('Error saving contact:', error);
            alert('An error occurred while saving the contact.');
        });
});
