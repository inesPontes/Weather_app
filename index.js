//Format Date

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];

  let weekday = day[date.getDay()];
  return `${weekday} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let exampleCity = document.querySelector(".exampleCity");
  exampleCity.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = `${temperature}`;
  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector(".weather-summary");
  descriptionElement.innerHTML = `${description}`;
  let windValue = Math.round(response.data.wind.speed);
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = `Wind Speed: ${windValue}km/h`;
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let tempIntervaleElement = document.querySelector(".temp_intervale");
  tempIntervaleElement.innerHTML = `${minTemp} - ${maxTemp}ºC`;
  let dateElement = document.querySelector(".todaysDate");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(location) {
  let apiKey = "e5b84de8f6e41d7411771c16118293ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit() {
  event.preventDefault();
  let location = document.querySelector("#inputPassword5");
  searchCity(location.value);
}

let form = document.querySelector(".cityname");
form.addEventListener("submit", handleSubmit);

//Current Location

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  getCordinates(coordinates);
}

let currentButton = document.querySelector(".currentLocation");
currentButton.addEventListener("click", showPosition);

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "e5b84de8f6e41d7411771c16118293ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

//Change temperature Unit

function showFarenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showcelsiustTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#Fahrenheit-link");
fahrenheitLink.addEventListener("click", showFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showcelsiustTemperature);

searchCity("Lisbon");

//Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#weather-forecast");

  let forecast = response.data.daily;

  let forecastHTML = `<div class="row justify-content-center">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col">
  <ul>
   <li class="date">${formatDay(forecastDay.dt)}</li>
   <li><img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        /></li>
   <li>${Math.round(forecastDay.temp.min)}ºC - ${Math.round(
          forecastDay.temp.max
        )}ºC</li>
   <li class="wind">Wind: 6 km/h</li>
  </ul>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "e5b84de8f6e41d7411771c16118293ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
