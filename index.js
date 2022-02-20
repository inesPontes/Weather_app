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

  displayMessage(description);
  displayWarning(description);

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let windValue = Math.round(response.data.wind.speed);
  let windElement = document.querySelector(".wind");
  windElement.innerHTML = `Wind Speed: ${windValue}km/h`;
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let tempIntervaleElement = document.querySelector(".temp_intervale");
  tempIntervaleElement.innerHTML = `Temperature: ${minTemp} - ${maxTemp}ºC`;
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

function displayMessage(description) {
  if (description === "Rain" || description === "shower rain") {
    document.querySelector(
      ".weather-summary"
    ).innerHTML = `Hello 🖐 <br> <font size="-0.5">Today it's going to be Rainy</font>`;
  } else {
    if (description === "Clear" || description === "clear sky") {
      document.querySelector(
        ".weather-summary"
      ).innerHTML = `Hello 🖐 <br> <font size="-0.5">Today is a Sunny day!</font>`;
    } else {
      if (description === "Mist") {
        document.querySelector(
          ".weather-summary"
        ).innerHTML = `Hello 🖐 <br> <font size="-0.5">It will be Foggy today</font>`;
      } else {
        if (
          description === "Clouds" ||
          description === "Few clouds" ||
          description === "Scattered clouds" ||
          description === "Broken clouds"
        ) {
          document.querySelector(
            ".weather-summary"
          ).innerHTML = `Hello 🖐 <br> <font size="-0.5">It will be Cloudy today</font>`;
        } else {
          if (description === "Snow") {
            document.querySelector(
              ".weather-summary"
            ).innerHTML = `Hello 🖐 <br> <font size="-0.5">Today it will Snow!</font>`;
          } else {
            if (description === "Thundestorm") {
              document.querySelector(
                ".weather-summary"
              ).innerHTML = `Hello 🖐 <br> <font size="-0.5">There's a Thunderstorm coming!</font>`;
            } else {
              document.querySelector(
                ".weather-summary"
              ).innerHTML = `Hello 🖐 <br> <font size="-0.5">Enjoy your day</font>`;
            }
          }
        }
      }
    }
  }
}

function displayWarning(description) {
  if (
    description === "Rain" ||
    description === "Shower rain" ||
    description === "Thunderstorm"
  ) {
    document.querySelector(".warning").innerHTML = `Don´t forget your umbrela!`;
  } else {
    if (description === "Clear" || description === "Few clouds") {
      document.querySelector(".warning").innerHTML = `Enjoy the sun 😁`;
    } else {
      if (description === "Snow") {
        document.querySelector(
          ".warning"
        ).innerHTML = `Wear a warm coat today!`;
      } else {
        if (description === "mist") {
          document.querySelector(
            ".warning"
          ).innerHTML = `With mist, drive carefully ⚠`;
        } else {
          document.querySelector(
            ".warning"
          ).innerHTML = `You won´t need your sunscreen today...`;
        }
      }
    }
  }
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
   <li class="temp-forecast"><span class="min-forecast-temp">${Math.round(
     forecastDay.temp.min
   )}ºC</span> - <span class="max-forecast-temp">${Math.round(
          forecastDay.temp.max
        )}ºC</span></li>
   
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
