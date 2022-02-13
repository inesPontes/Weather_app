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
  temperatureElement.innerHTML = `${temperature} ºC`;
  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector(".weather-summary");
  descriptionElement.innerHTML = `${description}`;
  let windValue = response.data.wind.speed;
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

searchCity("Lisbon");
