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
makeMonthDropdownWork();
makeYearDropdownWork();
makeJumpToDropdownsInteractive();
renderThemeColors();

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
    renderThemeColors();
  });
  
  calendarNextButton.addEventListener('click', () => {
    today = today.add(1, 'month'); 
    updateCalendarMonthAndYear();
    renderCalendarTableBody();
    renderThemeColors();
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

// GPT code:
function renderCalendarTableBody() {
  const currentMonth = today.month(); // Get current month index (0-11)
  const currentYear = today.year(); // Get current year
  // theme color variables:
  const todayForColors = dayjs();
  const monthInDigits = Number(todayForColors.format('M'));
  const colors = [
    null, // Placeholder for index 0
    '#4682B4', // January
    '#FF69B4', // February
    '#3CB371', // March
    '#FF4500', // April
    '#FF1493', // May
    '#00BFFF', // June
    '#FF8C00', // July
    '#FFA500', // August
    '#CD853F', // September
    '#FF4500', // October
    '#A9A9A9', // November
    '#4682B4'  // December
  ];

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

      if (col === 0) {
        td.style.color = `${colors[monthInDigits]}`;
      }
    }
    
    tableBody.appendChild(tr);
  }
}

function makeMonthDropdownWork() {
  const optionsContainer = document.querySelector('.month-dropdown-options');

  document.querySelector('.month-selector')
    .addEventListener('click', () => {
      optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
    });

  optionsContainer.querySelectorAll('div')
    .forEach((option) => {
      option.addEventListener('click', () => {
        document.querySelector('.month-selector').innerHTML = option.innerHTML + ' &#x2BC6;';
        optionsContainer.style.display = 'none';
      });
    });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.month-dropdown')) {
      optionsContainer.style.display = 'none';
    }
  });
}

function makeYearDropdownWork() {
  const optionsContainer = document.querySelector('.year-dropdown-options');
  const years = _.range(3000, 1900-1);
  
  years.forEach((year) => {
    optionsContainer.innerHTML += `
      <div id=${year}>${year}</div>
    `;
  });

  document.querySelector('.year-selector')
    .addEventListener('click', () => {
      optionsContainer.style.display = optionsContainer.style.display === 'block' ? 'none' : 'block';
    });

  optionsContainer.querySelectorAll('div')
    .forEach((option) => {
      option.addEventListener('click', () => {
        document.querySelector('.year-selector').innerHTML = option.innerHTML + ' &#x2BC6;';
        optionsContainer.style.display = 'none';
      });
    });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.year-dropdown')) {
      optionsContainer.style.display = 'none';
    }
  });
}

function makeJumpToDropdownsInteractive() {
  const monthDropdown = document.querySelector('.month-dropdown-options');
  const yearDropdown = document.querySelector('.year-dropdown-options');

  monthDropdown.querySelectorAll('div')
    .forEach((option) => {
      option.addEventListener('click', () => {
        today = today.month(option.id);
        updateCalendarMonthAndYear();
        renderCalendarTableBody();
        renderThemeColors();
      });
    });

  yearDropdown.querySelectorAll('div')
    .forEach((option) => {
      option.addEventListener('click', () => {
        today = today.year(option.id);
        updateCalendarMonthAndYear();
        renderCalendarTableBody();
        renderThemeColors();
      });
    });
}

function renderThemeColors() {
  const todayForColors = dayjs();
  const monthInDigits = Number(todayForColors.format('M'));
  const colors = [
    null, // Placeholder for index 0
    '#4682B4', // January
    '#FF69B4', // February
    '#3CB371', // March
    '#FF4500', // April
    '#FF1493', // May
    '#00BFFF', // June
    '#FF8C00', // July
    '#FFA500', // August
    '#CD853F', // September
    '#FF4500', // October
    '#A9A9A9', // November
    '#4682B4'  // December
  ];
  const calendarTable = document.querySelector('table');
  const calendarHeads = document.querySelectorAll('th');
  const calendarCells = document.querySelectorAll('td');

  calendarTable.style.border = `1px solid ${colors[monthInDigits]}`;
  calendarHeads.forEach((head) => {
    head.style.border = `1px solid ${colors[monthInDigits]}`;
  });
  calendarCells.forEach((cell) => {
    cell.style.border = `1px solid ${colors[monthInDigits]}`;
  });
}