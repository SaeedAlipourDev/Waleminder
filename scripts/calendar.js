import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js';
import {renderNewRemindersOnAddButtonClicked, renderReminders,
  makeDeleteButtonInteractive, renderReminderCellsDots} from './reminder.js';

const calendarMonthAndYear = document.querySelector('.js-month-and-year');
const calendarPreviousButton = document.querySelector('.js-previous-button');
const calendarNextButton = document.querySelector('.js-next-button');
let today;
let selectedTableCell;

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
renderCalendarTableHeader();
renderCalendarTableBody();
makeMonthDropdownWork();
makeYearDropdownWork();
makeJumpToDropdownsInteractive();
makeDeleteButtonInteractive();
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
    renderReminders();
    renderNewRemindersOnAddButtonClicked();
    makeDeleteButtonInteractive();
    renderReminderCellsDots();
  });
  
  calendarNextButton.addEventListener('click', () => {
    today = today.add(1, 'month'); 
    updateCalendarMonthAndYear();
    renderCalendarTableBody();
    renderThemeColors();
    renderReminders();
    renderNewRemindersOnAddButtonClicked();
    makeDeleteButtonInteractive();
    renderReminderCellsDots();
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

export function renderCalendarTableBody() {
  const currentMonth = today.month(); 
  const currentYear = today.year(); 
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

  let daysInMonth = monthDays[dayjs(today).format('MMMM')];
  
  if (currentMonth === 1 && leapYears.includes(currentYear)) {
    daysInMonth += 1; 
  }

  const firstDayOfMonth = dayjs(today).startOf('month').day();
  
  const calendarDays = Array(42).fill(null); 

  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays[i] = ''; 
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays[firstDayOfMonth + day - 1] = day;
  }

  const tableBody = document.querySelector('.table-body-container');
  tableBody.innerHTML = '';

  for (let row = 0; row < 6; row++) {
    const tr = document.createElement('tr');
    
    for (let col = 0; col < 7; col++) {
      const td = document.createElement('td');
      const index = row * 7 + col;
      
      td.textContent = calendarDays[index] || '';
      
      tr.appendChild(td);
    }
    
    tableBody.appendChild(tr);
  }

  renderCellsColorsOnclick(colors[monthInDigits]);
  renderReminders();
  renderNewRemindersOnAddButtonClicked();
  makeDeleteButtonInteractive();
  renderReminderCellsDots();
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
        document.querySelector('.month-selector').innerHTML = option.innerHTML + `<svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 10 4 4 4-4"/></svg>`;
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
        document.querySelector('.year-selector').innerHTML = option.innerHTML + `<svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m8 10 4 4 4-4"/></svg>`;
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
        renderReminders();
        renderNewRemindersOnAddButtonClicked();
        makeDeleteButtonInteractive();
        renderReminderCellsDots();
      });
    });

  yearDropdown.querySelectorAll('div')
    .forEach((option) => {
      option.addEventListener('click', () => {
        today = today.year(option.id);
        updateCalendarMonthAndYear();
        renderCalendarTableBody();
        renderThemeColors();
        renderReminders();
        renderNewRemindersOnAddButtonClicked();
        makeDeleteButtonInteractive();
        renderReminderCellsDots();
      });
    });
}

export function renderThemeColors() {
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

  calendarTable.style.border = `2px solid ${colors[monthInDigits]}`;
  calendarHeads.forEach((head) => {
    head.style.border = `2px solid ${colors[monthInDigits]}`;
  });
  calendarCells.forEach((cell) => {
    cell.style.border = `2px solid ${colors[monthInDigits]}`;
    if(cell.classList.contains('has-reminder')) {
      document.styleSheets[2].insertRule(
        `.has-reminder::after {
          color: ${colors[monthInDigits]};
        }`
      );
    }
  });
}

function renderCellsColorsOnclick(color) {
  const tableBody = document.querySelector('.table-body-container');
  const rows = tableBody.querySelectorAll('tr');
  const cells = tableBody.querySelectorAll('td');
  const weekendCells = [];

  rows.forEach((row) => {
    row.children[0].style.color = color;
    if (row.children[0].innerHTML !== '') {
      weekendCells.push(row.children[0].innerHTML);
    }
  });

  cells.forEach((cell) => {
    if (cell.innerHTML !== '') {
      cell.addEventListener('click', () => {        
        if (!selectedTableCell) {
          cell.style.color = 'white';
          cell.style.backgroundColor = color;
        } else {
          cells.forEach((cell) => {
            if (cell.innerHTML === selectedTableCell) {
              if (weekendCells.includes(cell.innerHTML)) {
                cell.style.color = color;
              } else {
                cell.style.color = 'black';
              }
              cell.style.backgroundColor = 'white';
            }
          });
          selectedTableCell = null;
          cell.style.color = 'white';
          cell.style.backgroundColor = color;
        }
        selectedTableCell = cell.innerHTML;
      });
    }
  });
}
