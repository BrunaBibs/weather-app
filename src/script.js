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
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let country = document.querySelector("#country");
  country.innerHTML = response.data.name;
  let humidity = document.querySelector("#hum-value");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind-value");
  wind.innerHTML = response.data.wind.speed;
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
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  let country = document.querySelector("#country");
  country.innerHTML = response.data.name;
  let humidity = document.querySelector("#hum-value");
  humidity.innerHTML = response.data.main.humidity;
}

function retrievePosition(position) {
  let apiKey = "a9faced9de85631774ac04816866c180";
  let lat = position.coords.latitude;
  console.log(lat);
  let lon = position.coords.longitude;
  console.log(lon);
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);

let icons = new Skycons({ color: "white" });

icons.set("clear-day", Skycons.CLEAR_DAY);
icons.play();
