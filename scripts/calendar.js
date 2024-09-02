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

function setColorsBasedOnMonth() {
  const today = dayjs();
  const monthInDigits = Number(today.format('M'));
  const backgroundElement = document.querySelector('.js-hero');
  const dateElement = document.querySelector('.js-today-date');
  const clockNums = document.querySelectorAll('.js-clock-color');
  const getWeatherButton = document.querySelector('.js-get-weather-button');

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
  dateElement.style.color = colors[monthInDigits];
  clockNums.forEach((num) => {
    num.style.color = colors[monthInDigits];
  });
  getWeatherButton.style.backgroundColor = colors[monthInDigits];
  getWeatherButton.style.borderColor = colors[monthInDigits];
  weatherOutput.style.borderLeft = `2px solid ${colors[monthInDigits]}`;
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
