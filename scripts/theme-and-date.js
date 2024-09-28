import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {weatherOutput} from './weather.js';

renderHeaderDate();
renderHeaderClock();
setColorsBasedOnMonth();

setInterval(setColorsBasedOnMonth, 3600000);

setInterval(() => {
  renderHeaderDate();
  renderHeaderClock();
}, 1000);

export function setColorsBasedOnMonth() {
  const today = dayjs();
  const monthInDigits = Number(today.format('M'));
  const backgroundElement = document.querySelector('.js-hero');
  const dateElement = document.querySelector('.js-today-date');
  const clockNums = document.querySelectorAll('.js-clock-color');
  const clock = document.querySelector('.js-clock');
  const getWeatherButton = document.querySelector('.js-get-weather-button');
  const weatherLabel = document.querySelector('.js-city-selector-label');
  const weatherSection = document.querySelector('.js-weather-section');
  const left = document.querySelector('.js-left');
  const calendarPrevButton = document.querySelector('.js-previous-button');
  const calendarNextButton = document.querySelector('.js-next-button');
  const reminderLabel = document.querySelector('.js-reminder-label');
  const addEventButton = document.querySelector('.js-add-event-button'); 
  const calendarSection = document.querySelector('.js-calendar-section');
  const remindersection = document.querySelector('.js-reminder-section');
  const eventInputsContainer = document.querySelector('.js-event-inputs-container');
  const header = document.querySelector('header');
  const headerSpans = header.querySelectorAll('span');

  const backgrounds = [
    null, // Placeholder for index 0
    'linear-gradient(to bottom, #B0E0E6, #4682B4)', // January
    'linear-gradient(to bottom, #FFB6C1, #FF69B4)', // February
    'linear-gradient(to bottom, #98FB98, #3CB371)', // March
    'linear-gradient(to bottom, #FFD700, #FF4500)', // April
    'linear-gradient(to bottom, #FF6347, #FF1493)', // May
    'linear-gradient(to bottom, #87CEFA, #00BFFF)', // June
    'linear-gradient(to bottom, #FF4500, #FF8C00)', // July
    'linear-gradient(to bottom, #FFD700, #FFA500)', // August
    'linear-gradient(to bottom, #FFDEAD, #CD853F)', // September
    'linear-gradient(to bottom, #FFA07A, #FF4500)', // October
    'linear-gradient(to bottom, #D3D3D3, #A9A9A9)', // November
    'linear-gradient(to bottom, #F0F8FF, #4682B4)'  // December
  ];

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

  backgroundElement.style.background = backgrounds[monthInDigits];
  left.style.borderRight = `3px solid ${colors[monthInDigits]}`;
  dateElement.style.color = colors[monthInDigits];
  clockNums.forEach((num) => {
    num.style.color = colors[monthInDigits];
  });
  dateElement.style.borderTop = `3px solid ${colors[monthInDigits]}`;
  dateElement.style.borderBottom = `3px solid ${colors[monthInDigits]}`;
  clock.style.borderTop = `3px solid ${colors[monthInDigits]}`;
  clock.style.borderBottom = `3px solid ${colors[monthInDigits]}`;
  weatherSection.style.borderTop = `3px solid ${colors[monthInDigits]}`;
  weatherSection.style.borderBottom = `3px solid ${colors[monthInDigits]}`;
  getWeatherButton.style.backgroundColor = colors[monthInDigits];
  getWeatherButton.style.borderColor = colors[monthInDigits];
  weatherOutput.style.borderTop = `3px solid ${colors[monthInDigits]}`;
  weatherOutput.style.borderLeft = `3px solid ${colors[monthInDigits]}`;
  weatherOutput.style.borderRight = `3px solid ${colors[monthInDigits]}`;
  weatherLabel.style.borderRight = `3px solid ${colors[monthInDigits]}`;
  weatherLabel.style.borderLeft = `3px solid ${colors[monthInDigits]}`;
  weatherLabel.style.borderRadius = '10px';
  [calendarPrevButton, calendarNextButton].forEach((button) => {
    button.style.border = `3px solid ${colors[monthInDigits]}`;
    button.style.backgroundColor = colors[monthInDigits];
  });
  reminderLabel.style.borderLeft = `3px solid ${colors[monthInDigits]}`;
  reminderLabel.style.borderRight = `3px solid ${colors[monthInDigits]}`;
  addEventButton.style.backgroundColor = `${colors[monthInDigits]}`;
  addEventButton.style.borderColor = `${colors[monthInDigits]}`;
  calendarSection.style.borderTop = `3px solid ${colors[monthInDigits]}`;
  calendarSection.style.borderBottom = `3px solid ${colors[monthInDigits]}`;
  remindersection.style.borderTop = `3px solid ${colors[monthInDigits]}`;
  remindersection.style.borderBottom = `3px solid ${colors[monthInDigits]}`;
  eventInputsContainer.style.borderBottom = `3px solid ${colors[monthInDigits]}`;
  header.style.borderBottom = `3px solid ${colors[monthInDigits]}`;
  headerSpans.forEach((span) => {
    span.style.color = colors[monthInDigits];
  });
}

function renderHeaderDate () {
  const today = dayjs();
  const todayString = today.format('dddd, MMMM D, YYYY');

  document.querySelector('.js-today-date').innerHTML = todayString;
}

function renderHeaderClock () {
  const today = dayjs();
  
  document.getElementById('hours').innerHTML = today.format('HH');
  document.getElementById('mins').innerHTML = today.format('mm');
  document.getElementById('sec').innerHTML = today.format('ss');
}
