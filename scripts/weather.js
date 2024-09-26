import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {cities} from './data/cities.js';

const cityInput = document.getElementById('city-input');
const cityList = document.getElementById('city-list');
const getWeatherButton = document.getElementById('get-weather');
export const weatherOutput = document.getElementById('weather-output');

function filterCities() {
  const input = cityInput.value.normalize("NFD").replace(/[\u0300-\u036f-]/g, "").toLowerCase();
  cityList.innerHTML = '';

  if (input) {
    const filteredCities = cities.filter(city => city.normalize("NFD").replace(/[\u0300-\u036f-]/g, "").toLowerCase().includes(input));
    
    filteredCities.forEach(city => {
      const li = document.createElement('li');
      li.textContent = city;
      li.onclick = () => selectCity(city);
      cityList.appendChild(li);
    });
    cityList.style.display = filteredCities.length ? 'block' : 'none';
  } else {
    cityList.style.display = 'none';
  }
}

document.querySelector('.js-city-input')
  .addEventListener('input', () => {
    filterCities();
  });

function selectCity(city) {
  cityInput.value = city;
  cityList.style.display = 'none';
}

getWeatherButton.onclick = () => {
  cityList.style.display = 'none';
  weatherOutput.style.display = 'flex';
  weatherOutput.style.flexDirection = 'column';
  weatherOutput.style.justifyContent = 'center';
  const selectedCity = cityInput.value;
  if (selectedCity) {
    fetchWeather(selectedCity);
  } else {
    weatherOutput.innerHTML = 'Please select a city.';
  }
};

async function fetchWeather(city) {
  const apiKey = 'a82a99fc9079911d6045feeebfd98b0b';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  let weatherDescription;
  let temperature;
  let iconCode;
  let iconUrl;
  let iconHTML;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`City not found: ${response.statusText}`);
    }

    const data = await response.json();
    temperature = data.main.temp;
    weatherDescription = data.weather[0].description;
    iconCode = data.weather[0].icon;
    iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
    iconHTML = `<img src="${iconUrl}" alt="Weather Icon">`

    weatherOutput.innerHTML = `
      <div>Current weather in&nbsp;<span>${city}</span>&nbsp;:</div>
      <div class="weather-description"><span>${weatherDescription}</span>${iconHTML} <span>${Math.round(temperature)}</span>°C</div>
    `;

    renderThemeColorsForWeatherOutput();
    cityInput.value = '';
  } catch (error) {
    weatherOutput.innerHTML = `Error: ${error.message}`;
  }
  
  weatherOutput.innerHTML = `Fetching weather for&nbsp;<span>${city}</span>...`;
  renderThemeColorsForWeatherOutput();
  
  setTimeout(() => {
    weatherOutput.innerHTML = `
      <div>Current weather in&nbsp;<span>${city}</span>&nbsp;:</div>
      <div class="weather-description"><span>${weatherDescription}</span>${iconHTML} <span>${Math.round(temperature)}</span>°C</div>
    `;    
    renderThemeColorsForWeatherOutput();
  }, 1000);
}

document.querySelector('body')
  .addEventListener('click', () => {
    cityList.style.display = 'none';
  });

function renderThemeColorsForWeatherOutput() {
  const today = dayjs();
  const monthInDigits = Number(today.format('M'));
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
  document.querySelectorAll('.weather-output span')
    .forEach((span) => {
      span.style.color = colors[monthInDigits];
    });
}