const dateInput = document.querySelector('.event-date-input');
const eventTitleInput = document.querySelector('.event-title-input');
const eventDescriptionInput = document.querySelector('.event-description-input');
const addEventButton = document.querySelector('.add-event-button');
const reminders = document.querySelector('.reminders');

addEventButton.addEventListener('click', () => {
  if (!dateInput.value || !eventTitleInput.value || !eventDescriptionInput.value) {
    alert('Please fill all the fields.');
  } else {
  }
});