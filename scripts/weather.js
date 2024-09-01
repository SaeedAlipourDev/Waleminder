import {cities} from './data/cities.js';

const cityInput = document.getElementById('city-input');
const cityList = document.getElementById('city-list');
const getWeatherButton = document.getElementById('get-weather');
const weatherOutput = document.getElementById('weather-output');

function filterCities() {
  const input = cityInput.value.toLowerCase();
  cityList.innerHTML = '';

  if (input) {
    getAllCities();
    const filteredCities = cities.filter(city => city.toLowerCase().includes(input));
    
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
  const selectedCity = cityInput.value;
  if (selectedCity) {
    fetchWeather(selectedCity);
  } else {
    weatherOutput.textContent = 'Please select a city.';
  }
};

async function fetchWeather(city) {
  const apiKey = 'a82a99fc9079911d6045feeebfd98b0b';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  let weatherDescription;
  let temperature;

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`City not found: ${response.statusText}`);
    }

    const data = await response.json();
    temperature = data.main.temp;
    weatherDescription = data.weather[0].description;

    weatherOutput.textContent = `Current weather in ${city}: ${weatherDescription}, ${temperature}°C`;
  } catch (error) {
    weatherOutput.textContent = `Error: ${error.message}`;
  }
  
  weatherOutput.textContent = `Fetching weather for ${city}...`;
  
  setTimeout(() => {
    weatherOutput.textContent = `Current weather in ${city}: ${weatherDescription}, ${temperature}°C`;
  }, 1000);
}
