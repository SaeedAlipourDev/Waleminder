import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {renderReminderCellsDots} from './calendar.js';

export const savedReminders = JSON.parse(localStorage.getItem('savedReminders')) || [];

const dateInput = document.querySelector('.js-event-date-input');
const eventTitleInput = document.querySelector('.js-event-title-input');
const eventDescriptionInput = document.querySelector('.event-description-input');
const addEventButton = document.querySelector('.js-add-event-button');
const reminders = document.querySelector('.js-reminders');
const eventAddedText = document.querySelector('.js-event-added-text');
let remindersHtml;

saveReminders();
renderReminders();
renderNewRemindersOnAddButtonClicked();

function saveReminders() {
  addEventButton.addEventListener('click', () => {
    if (!dateInput.value || !eventTitleInput.value || !eventDescriptionInput.value) {
      alert('Please fill out all the fields.');
      [dateInput, eventTitleInput, eventDescriptionInput].forEach((input) => {
        if (!input.value) {
          input.style.borderColor = 'red';
          input.addEventListener('change', () => {
            input.style.removeProperty('border-color');
          });
          setTimeout(() => {
            input.style.removeProperty('border-color');
          }, 10000);
        }
      });
    } else {
      eventAddedText.innerHTML = 'Event Added Successfully!'
      setTimeout(() => {
        eventAddedText.innerHTML = '';
      }, 5000);
      const eventObject = {
        "date": dateInput.value,
        "title": eventTitleInput.value,
        "description": eventDescriptionInput.value
      };
      savedReminders.push(eventObject);
      localStorage.setItem('savedReminders', JSON.stringify(savedReminders));
      eventTitleInput.value = '';
      eventDescriptionInput.value = '';
    } 
  });
}

export function renderReminders() {
  const tableBody = document.querySelector('.js-table-body-container');
  const calendarMonthAndYear = document.querySelector('.js-month-and-year');
  tableBody.querySelectorAll('td')
    .forEach((cell) => {
      cell.addEventListener('click', () => {
        remindersHtml = '';
        const day = cell.innerHTML;
        const monthAndYear = calendarMonthAndYear.innerHTML;
        const calendarDate = day + ' ' + monthAndYear;
        const calendarDateFormatted = dayjs(calendarDate).format('YYYY-MM-DD');
        const remindersForDate = savedReminders.filter(reminder => reminder.date === calendarDateFormatted);
        if (remindersForDate.length > 0) {
          savedReminders.forEach((reminder) => {
            if (reminder.date === calendarDateFormatted) {
              const reminderId = `${reminder.date+reminder.title+reminder.description}`;
              remindersHtml += `
                <div class="reminder js-reminder">
                  <div class="reminder-text"><span>${reminder.title}</span>&nbsp;<span>&#x2010;</span>&nbsp;${reminder.description}&nbsp;<span>&#x2010;</span>&nbsp;${reminder.date}</div>
                  <button class="reminder-delete-button js-reminder-delete-button" data-button-id="${reminderId}">
                    Delete
                  </button>
                </div>
              `
              reminders.innerHTML = remindersHtml;
            } 
          });
        } else {
          reminders.innerHTML = 'No reminders for this date.';
        }
      });
    });
}

export function renderNewRemindersOnAddButtonClicked() {
  const tableBody = document.querySelector('.js-table-body-container');
  const calendarMonthAndYear = document.querySelector('.js-month-and-year');
  addEventButton.addEventListener('click', () => {
    tableBody.querySelectorAll('td')
      .forEach((cell) => {
        if (cell.style.color === 'white') {
          remindersHtml = '';
          const day = cell.innerHTML;
          const monthAndYear = calendarMonthAndYear.innerHTML;
          const calendarDate = day + ' ' + monthAndYear;
          const calendarDateFormatted = dayjs(calendarDate).format('YYYY-MM-DD');
          savedReminders.forEach((reminder) => {
            if (reminder.date === calendarDateFormatted) {
              const reminderId = `${reminder.date+reminder.title+reminder.description}`;
              remindersHtml += `
                <div class="reminder js-reminder">
                  <div class="reminder-text"><span>${reminder.title}</span>&nbsp;<span>&#x2010;</span>&nbsp;${reminder.description}&nbsp;<span>&#x2010;</span>&nbsp;${reminder.date}</div>
                  <button class="reminder-delete-button js-reminder-delete-button" data-button-id="${reminderId}">
                    Delete
                  </button>
                </div>
              `
              reminders.innerHTML = remindersHtml;

              renderReminderCellsDots();
            }
          });
        }
      });
  });
}

export function makeDeleteButtonInteractive() {
  const calendarBody = document.querySelector('.js-table-body-container');
  const cells = calendarBody.querySelectorAll('td');

  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      const deleteButtons = document.querySelectorAll('.js-reminder-delete-button');
  
      deleteButtons.forEach((button) => {
        button.addEventListener('click', () => {
          savedReminders.forEach((reminder) => {
            if(button.dataset.buttonId === `${reminder.date+reminder.title+reminder.description}`) {
              button.parentNode.remove();
              renderReminders();
              const index = savedReminders.indexOf(reminder);
              savedReminders.splice(index, 1);
              localStorage.setItem('savedReminders', JSON.stringify(savedReminders));
              console.log(savedReminders);
            }
          });
        });
      });
    });
  });
}

console.log(savedReminders);