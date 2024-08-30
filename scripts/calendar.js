import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

setBgBasedOnMonth();
setInterval(setBgBasedOnMonth, 3600000);

renderHeaderDate();
renderHeaderClock();
setInterval(() => {
  renderHeaderDate();
  renderHeaderClock();
}, 1000);

function setBgBasedOnMonth() {
  const today = dayjs();
  const monthInDigits = Number(today.format('M'));
  const backgroundElement = document.querySelector('.js-hero');

  if(monthInDigits === 1) {
    backgroundElement.style.background = 'linear-gradient(to bottom, #B0E0E6, #4682B4)';
  } else if(monthInDigits === 2) {
    backgroundElement.style.background = "linear-gradient(to bottom, #FFB6C1, #FF69B4)";
  } else if(monthInDigits === 3) {
    backgroundElement.style.background = "linear-gradient(to bottom, #98FB98, #3CB371)";
  } else if(monthInDigits === 4) {
    backgroundElement.style.background = "linear-gradient(to bottom, #FFD700, #FF4500)";
  } else if(monthInDigits === 5) {
    backgroundElement.style.background = "linear-gradient(to bottom, #FF6347, #FF1493)";
  } else if(monthInDigits === 6) {
    backgroundElement.style.background = "linear-gradient(to bottom, #87CEFA, #00BFFF)";
  } else if(monthInDigits === 7) {
    backgroundElement.style.background = "linear-gradient(to bottom, #FF4500, #FF8C00)";
  } else if(monthInDigits === 8) {
    backgroundElement.style.background = "linear-gradient(to bottom, #FFD700, #FFA500)";
  } else if(monthInDigits === 9) {
    backgroundElement.style.background = "linear-gradient(to bottom, #FFDEAD, #CD853F)";
  } else if(monthInDigits === 10) {
    backgroundElement.style.background = "linear-gradient(to bottom, #FFA07A, #FF4500)";
  } else if(monthInDigits === 11) {
    backgroundElement.style.background = "linear-gradient(to bottom, #D3D3D3, #A9A9A9)";
  } else if(monthInDigits === 12) {
    backgroundElement.style.background = "linear-gradient(to bottom, #F0F8FF, #4682B4)";
  }
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
