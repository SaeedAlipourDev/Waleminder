import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const calendarMonthAndYear = document.querySelector('.js-month-and-year');
const calendarPreviousButton = document.querySelector('.js-previous-button');
const calendarNextButton = document.querySelector('.js-next-button');
let today;

function fetchDate() {
  today = dayjs();
  return today;
}

async function renderCalendarMonthAndYear() {
  await fetchDate();
  updateCalendarMonthAndYear();

  calendarPreviousButton.addEventListener('click', () => {
    today = today.subtract(1, 'month'); 
    updateCalendarMonthAndYear();
  });
  
  calendarNextButton.addEventListener('click', () => {
    today = today.add(1, 'month'); 
    updateCalendarMonthAndYear();
  });
}

function updateCalendarMonthAndYear() {
  const currentMonthAndYear = today.format('MMMM YYYY');
  calendarMonthAndYear.innerHTML = currentMonthAndYear;
}

renderCalendarMonthAndYear();
