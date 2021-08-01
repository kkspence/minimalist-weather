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
// 12 hour clock
let getAorP = "";
if (hours >= 0 && hours <= 12) {
  getAorP = `am`;
} else {
  getAorP = `pm`;
}

if (hours > 12) {
  hours = hours - 12;
} else if (hours === 0) {
  hours = 12;
}
let day = days[now.getDay()];

date.innerHTML = `${day} ${hours}:${minutes}${getAorP}`;
// Card Day Format
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

// Forcast Cards

function displayForecast(response) {
  let forecast = response.data.daily;
  let forcastElement = document.querySelector("#cards");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
     ${formatDay(forecastDay.dt)}
      <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title" id="weather-icon"><img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt=""></h5>
                <p class="card-text">
                    <div class="degrees" id="day1">
                  ${Math.round(forecastDay.temp.day)}°
                  </div>
                </p>
              </div>
            </div>
          </div>
    </div>`;
    }
  });

  forcastElement.innerHTML = forecastHTML;
}

// Form

function getForecast(coordinates) {
  console.log(coordinates);
  let myApiKey = `e6bf661a63a2a9f0aece972a71eb184a&units=imperial`;
  let forecastApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${myApiKey}`;
  axios.get(forecastApi).then(displayForecast);
}
// API Search
function searchCityWeather(response) {
  console.log(response.data);
  let htemp = Math.round(response.data.main.temp);
  let hdes = response.data.weather[0].description;
  let displayCitySearch = document.querySelector("#city");
  let displayTodayWeather = document.querySelector("#header-temp");
  let displayTodayDesc = document.querySelector("#header-description");
  let windspeed = Math.round(response.data.wind.speed);
  let headerWind = document.querySelector("#windspeed");
  let humidity = Math.round(response.data.main.humidity);
  let headerHumid = document.querySelector("#humidity");
  let headerIcon = document.querySelector("#header-icon");

  displayCitySearch.innerHTML = response.data.name;
  displayTodayWeather.innerHTML = `${htemp}°F`;
  displayTodayDesc.innerHTML = `${hdes}`;
  headerWind.innerHTML = `${windspeed} mph`;
  headerHumid.innerHTML = `${humidity}% humidity`;
  headerIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}
function search(city) {
  let myApiKey = `e6bf661a63a2a9f0aece972a71eb184a&units=imperial`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApiKey}`;
  axios.get(apiUrl).then(searchCityWeather);
  console.log(apiUrl);
}

function handleEnter(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city-input");
  search(currentCity.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleEnter);

search("Philadelphia");

// Geolocation button
function showCurrentPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let myApiKey = `e6bf661a63a2a9f0aece972a71eb184a&units=imperial`;
  let apiGeoUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myApiKey}`;
  axios.get(apiGeoUrl).then(searchCityWeather);
}

function navigation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", navigation);
