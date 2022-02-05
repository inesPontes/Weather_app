//Substitute Today´s date

let newDate = new Date();

let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];

let weekday = day[newDate.getDay()];

let hour = newDate.getHours();
let minute = newDate.getMinutes();

let today = document.querySelector(".todaysDate");
today.innerHTML = `${weekday} ${hour}:${minute}`;

//Search Engine

function changeCity() {
  event.preventDefault();
  let location = document.querySelector("#inputPassword5");
  let apiKey = "e5b84de8f6e41d7411771c16118293ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function showWeather(response) {
  document.querySelector(".exampleCity").innerHTML = response.data.name;
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
}

let form = document.querySelector(".cityname");
form.addEventListener("submit", changeCity);

//week 5 - Current Location

function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "e5b84de8f6e41d7411771c16118293ab";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentButton = document.querySelector(".currentLocation");
currentButton.addEventListener("click", showPosition);
