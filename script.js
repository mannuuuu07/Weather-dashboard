// API_KEY is now imported from config.js
let isCelsius = true;
const API_KEY = "d645085500dcdaf7d85109f624d0fed2";

function getWeather(city = "") {
  if (!city) {
    const input = document.getElementById("cityInput");
    city = input.value.trim();
    if (!city) return alert("Please enter a city name.");
  }

  const units = isCelsius ? "metric" : "imperial";
  const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`;

  fetch(currentURL)
    .then((res) => res.json())
    .then((data) => displayCurrentWeather(data))
    .catch((err) => console.error(err));

  fetch(forecastURL)
    .then((res) => res.json())
    .then((data) => displayForecast(data))
    .catch((err) => console.error(err));
}

function displayCurrentWeather(data) {
  if (data.cod !== 200) {
    alert("City not found.");
    return;
  }

  const weatherEl = document.getElementById("weather");
  weatherEl.style.display = "block";
  weatherEl.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <div class="weather-info">🌡 Temperature: ${data.main.temp} ${isCelsius ? "°C" : "°F"}</div>
    <div class="weather-info">🌥 Condition: ${data.weather[0].main} <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="icon" /></div>
    <div class="weather-info">💧 Humidity: ${data.main.humidity}%</div>
    <div class="weather-info">🌬 Wind Speed: ${data.wind.speed} ${isCelsius ? "m/s" : "mph"}</div>
    <h3>5-Day Forecast</h3>
    <div id="forecast" class="forecast-grid"></div>
  `;
}

function displayForecast(data) {
  const forecastEl = document.getElementById("forecast");
  forecastEl.innerHTML = "";

  const forecastMap = new Map();
  data.list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!forecastMap.has(date)) {
      forecastMap.set(date, item);
    }
  });

  forecastMap.forEach((item, date) => {
    const div = document.createElement("div");
    div.className = "forecast-card";
    div.innerHTML = `
      <strong>${new Date(date).toDateString()}</strong>
      <div>${item.weather[0].main} <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="icon" /></div>
      <div>🌡 ${item.main.temp} ${isCelsius ? "°C" : "°F"}</div>
      <div>💧 ${item.main.humidity}%</div>
    `;
    forecastEl.appendChild(div);
  });
}

function toggleTempUnit() {
  isCelsius = !isCelsius;
  const city = document.getElementById("cityInput").value.trim();
  if (city) getWeather(city);
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("weatherDarkMode", isDark);
}

window.onload = () => {
  if (localStorage.getItem("weatherDarkMode") === "true") {
    document.body.classList.add("dark");
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const units = isCelsius ? "metric" : "imperial";
      const geoURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${units}`;

      fetch(geoURL)
        .then(res => res.json())
        .then(data => {
          document.getElementById("cityInput").value = data.name;
          getWeather(data.name);
        });
    });
  }
};