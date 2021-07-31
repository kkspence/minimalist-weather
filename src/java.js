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

// Forcast Cards

function displayForecast() {
  let forcastElement = document.querySelector("#cards");
  let forecastHTML = "";
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
     ${day}
      <div class="col">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title" id="weather-icon"><img src="http://openweathermap.org/img/wn/02d@2x.png" alt=""></h5>
                <p class="card-text">
                    <div class="degrees" id="day1">
                  97<span class="measure">°F</span>
                  </div>
                </p>
              </div>
            </div>
          </div>
    </div>`;
  });

  forcastElement.innerHTML = forecastHTML;
}

// Form

// API Search
function searchCityWeather(response) {
  console.log(response.data);
  let htemp = Math.round(response.data.main.temp);
  let hdes = response.data.weather[0].description;
  let displayCitySearch = document.querySelector("#city-input");
  let displayTodayWeather = document.querySelector("#header-temp");
  let displayTodayDesc = document.querySelector("#header-description");
  let windspeed = Math.round(response.data.wind.speed);
  let headerWind = document.querySelector("#windspeed");
  let humidity = Math.round(response.data.main.humidity);
  let headerHumid = document.querySelector("#humidity");
  let headerIcon = document.querySelector("#header-icon");

  farenheitTemp = response.data.main.temp;
  windspeedunit = response.data.wind.speed;

  displayCitySearch.innerHTML = response.data.name;
  displayTodayWeather.innerHTML = `${htemp}°F`;
  displayTodayDesc.innerHTML = `${hdes}`;
  headerWind.innerHTML = `${windspeed} mph`;
  headerHumid.innerHTML = `${humidity}% humidity`;
  headerIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
  let headerTemp = document.querySelector("#header-temp");
  let headerDesc = document.querySelector("#header-description");
  let windspeed = Math.round(response.data.wind.speed);
  let headerWind = document.querySelector("#windspeed");
  let humidity = Math.round(response.data.main.humidity);
  let headerHumid = document.querySelector("#humidity");
  let headerIcon = document.querySelector("#header-icon");

  farenheitTemp = response.data.main.temp;
  windspeedunit = response.data.wind.speed;

  h1.innerHTML = `${geoCity}`;
  headerTemp.innerHTML = `${currentTemp}°F`;
  headerDesc.innerHTML = `${description}`;
  headerWind.innerHTML = `${windspeed} mph`;
  headerHumid.innerHTML = `${humidity}% humidity`;
  headerIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

// Unit Conversion
function displayCelsiusTemp(event) {
  event.preventDefault();
  let celsiusTemp = Math.round(((farenheitTemp - 32) * 5) / 9);
  let headerTempCelsConversion = document.querySelector("#header-temp");
  let kmsWindspeed = Math.round(windspeedunit * 0.44704);
  let windspeed = document.querySelector("#windspeed");

  headerTempCelsConversion.innerHTML = `${celsiusTemp}°C`;
  windspeed.innerHTML = `${kmsWindspeed} m/s`;
}

function returnToFarenheit(event) {
  event.preventDefault();
  let farenheitReturn = document.querySelector("#header-temp");
  farenheitReturn.innerHTML = `${Math.round(farenheitTemp)}°F`;

  let windspeedReturn = document.querySelector("#windspeed");
  windspeedReturn.innerHTML = `${Math.round(windspeedunit)} mph`;
}
let celsiuslink = document.querySelector("#celsius");
celsiuslink.addEventListener("click", displayCelsiusTemp);

let farenheitlink = document.querySelector("#farenheit");
farenheitlink.addEventListener("click", returnToFarenheit);

let farenheitTemp = null;
let windspeedunit = null;
displayForecast();
