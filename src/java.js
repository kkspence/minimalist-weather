// Time
let now = new Date();
let date = document.querySelector("#current-date");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

date.innerHTML = `${day} ${hours}:${minutes}`;

// Form

// API Search
function searchCityWeather(response) {
  console.log(response.data);
  let h5temp = Math.round(response.data.main.temp);
  let h5des = response.data.weather[0].description;
  let displayCitySearch = document.querySelector("h1");
  displayCitySearch.innerHTML = response.data.name;
  let displayTodayWeather = document.querySelector("h5");
  displayTodayWeather.innerHTML = `Currently ${h5temp}°F / ${h5des}`;
}

function cityForm(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city");
  let displayCity = document.querySelector("#city-input");
  displayCity.innerHTML = `${currentCity.value}`;
  // API Call
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity.value}&appid=e6bf661a63a2a9f0aece972a71eb184a&units=imperial`;
  axios.get(apiUrl).then(searchCityWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", cityForm);

// Geolocation button

function showTempature(response) {
  console.log(response.data);
  let currentTemp = Math.round(response.data.main.temp);
  let geoCity = response.data.name;
  let description = response.data.weather[0].description;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${geoCity}`;
  let h5 = document.querySelector("h5");
  h5.innerHTML = `Currently ${currentTemp}°F / ${description} `;
}

function showCurrentPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e6bf661a63a2a9f0aece972a71eb184a&units=imperial`;
  axios.get(apiGeoUrl).then(showTempature);
}

function navigation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", navigation);
