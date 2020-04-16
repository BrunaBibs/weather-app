function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("h2");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Search by city-----------------------------------------------------

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let country = document.querySelector("#country");
  country.innerHTML = response.data.name;
  let humidity = document.querySelector("#hum-value");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind-value");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  console.log(response.data.weather[0].description);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://raw.githubusercontent.com/BrunaBibs/weather-app/master/icons/${response.data.weather[0].icon}.png`
  );
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city");
  let apiKey = "a9faced9de85631774ac04816866c180";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units}&appid=${apiKey}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", showCity);

// Search by Current Position--------------------------------------------

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let country = document.querySelector("#country");
  country.innerHTML = response.data.name;
  let humidity = document.querySelector("#hum-value");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind-value");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://raw.githubusercontent.com/BrunaBibs/weather-app/master/icons/${response.data.weather[0].icon}.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function retrievePosition(position) {
  let apiKey = "a9faced9de85631774ac04816866c180";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);
