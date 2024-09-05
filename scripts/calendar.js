import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js';

const calendarMonthAndYear = document.querySelector('.js-month-and-year');
const calendarPreviousButton = document.querySelector('.js-previous-button');
const calendarNextButton = document.querySelector('.js-next-button');
let today;

const weekdays = [
  null,
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const monthDays = {
  "January": 31, 
  "February": 28, /*29 days in a leap year*/
  "March": 31, 
  "April": 30, 
  "May": 31, 
  "June": 30, 
  "July": 31, 
  "August": 31, 
  "September": 30, 
  "October": 31, 
  "November": 30, 
  "December": 31
};

const leapYears = getLeapYears(1900, 3000);

renderCalendarMonthAndYear();
renderCalendarTableHeader()
renderCalendarTableBody();

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
    renderCalendarTableBody();
  });
  
  calendarNextButton.addEventListener('click', () => {
    today = today.add(1, 'month'); 
    updateCalendarMonthAndYear();
    renderCalendarTableBody();
  });
}

function updateCalendarMonthAndYear() {
  const currentMonthAndYear = today.format('MMMM YYYY');
  calendarMonthAndYear.innerHTML = currentMonthAndYear;
}

function renderCalendarTableHeader() {
  const tableHeaderRow = document.querySelector('.js-table-header-row');
  for (let i = 1; i < weekdays.length; i++) {
    tableHeaderRow.innerHTML += `<th>${weekdays[i]}</th>`;
  }
}

function getLeapYears(start, end) {
  const leapYears = [];
  
  for (let year = start; year <= end; year++) {
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
      leapYears.push(year);
    }
  }
  
  return leapYears;
}

/* This is my own code. I couldn't continue so I asked GPT.
function renderCalendarTableBody() {
  let daysOfEachMonth = Object.values(monthDays);
  leapYears.forEach((leapYear) => {
    if (Number(today.format('YYYY')) === leapYear) {
      daysOfEachMonth[1] + 1;
    }
  });

  daysOfEachMonth.unshift(null);
  const currentMonth = Number(today.format('M'));
  const tableBody = document.querySelector('.table-body-container');

  for (let i = 0; i < daysOfEachMonth.length; i++) {
    if (i === currentMonth) {
      const daysOfTheMonth = _.range(1, daysOfEachMonth[i] + 1);

    }
  }
*/

// GPT code:
function renderCalendarTableBody() {
  const currentMonth = today.month(); // Get current month index (0-11)
  const currentYear = today.year(); // Get current year

  // Get number of days in the current month
  let daysInMonth = monthDays[dayjs(today).format('MMMM')];
  
  // Check for leap year if February
  if (currentMonth === 1 && leapYears.includes(currentYear)) {
    daysInMonth += 1; // Add an extra day for leap year
  }

  // Get the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const firstDayOfMonth = dayjs(today).startOf('month').day();
  
  // Initialize an array to hold the calendar days
  const calendarDays = Array(42).fill(null); // 6 weeks x 7 days

  // Fill in empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays[i] = ''; // Empty cells before the start of the month
  }

  // Fill in the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays[firstDayOfMonth + day - 1] = day;
  }

  // Your existing code for rendering
  const tableBody = document.querySelector('.table-body-container');
  tableBody.innerHTML = ''; // Clear previous content

  for (let row = 0; row < 6; row++) {
    const tr = document.createElement('tr');
    
    for (let col = 0; col < 7; col++) {
      const td = document.createElement('td');
      const index = row * 7 + col;
      
      // Use your own method to set text or leave empty
      td.textContent = calendarDays[index] || ''; // Set text or leave empty
      
      tr.appendChild(td);
    }
    
    tableBody.appendChild(tr);
  }
}
