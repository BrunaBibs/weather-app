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

//----------------------------------- Search by city-----------------------------------------------------

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  celsiusTemperature = response.data.main.temp;
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
}

//---------------------------Show Forecast--------------------------------------------------

function formatForecast(forecast) {
  let date = new Date(forecast);
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

function showForecast(response) {
  let forecast1Element = document.querySelector(".day-first");
  let forecastOne = response.data.list[7];
  forecast1Element.innerHTML = `
    <div class="day-first">
      ${formatForecast(forecastOne.dt_txt)}
      <img
        src="https://raw.githubusercontent.com/BrunaBibs/weather-app/master/icons/${
          forecastOne.weather[0].icon
        }.png"
        alt="clear"
        id="icon"
      />
      <strong>${Math.round(forecastOne.main.temp_max)}º</strong> | ${Math.round(
    forecastOne.main.temp_min
  )}º
    </div>
  `;
  let forecast2Element = document.querySelector(".day-second");
  let forecastTwo = response.data.list[15];
  forecast2Element.innerHTML = `
    <div class="day-second">
      ${formatForecast(forecastTwo.dt_txt)}
      <img
        src="https://raw.githubusercontent.com/BrunaBibs/weather-app/master/icons/${
          forecastTwo.weather[0].icon
        }.png"
        alt="clear"
        id="icon"
      />
      <strong>${Math.round(forecastTwo.main.temp_max)}º</strong> | ${Math.round(
    forecastTwo.main.temp_min
  )}º
    </div>
  `;
  let forecast3Element = document.querySelector(".day-third");
  let forecastThree = response.data.list[23];
  forecast3Element.innerHTML = `
    <div class="day-third">
      ${formatForecast(forecastThree.dt_txt)}
      <img
        src="https://raw.githubusercontent.com/BrunaBibs/weather-app/master/icons/${
          forecastThree.weather[0].icon
        }.png"
        alt="clear"
        id="icon"
      />
      <strong>${Math.round(
        forecastThree.main.temp_max
      )}º</strong> | ${Math.round(forecastThree.main.temp_min)}º
    </div>
  `;
  let forecast4Element = document.querySelector(".day-fourth");
  let forecastFour = response.data.list[31];
  forecast4Element.innerHTML = `
    <div class="day-fourth">
      ${formatForecast(forecastFour.dt_txt)}
      <img
        src="https://raw.githubusercontent.com/BrunaBibs/weather-app/master/icons/${
          forecastFour.weather[0].icon
        }.png"
        alt="clear"
        id="icon"
      />
      <strong>${Math.round(
        forecastFour.main.temp_max
      )}º</strong> | ${Math.round(forecastFour.main.temp_min)}º
    </div>
  `;
  let forecast5Element = document.querySelector(".day-fifth");
  let forecastFive = response.data.list[39];
  forecast5Element.innerHTML = `
    <div class="day-fifth">
      ${formatForecast(forecastFive.dt_txt)}
      <img
        src="https://raw.githubusercontent.com/BrunaBibs/weather-app/master/icons/${
          forecastFive.weather[0].icon
        }.png"
        alt="clear"
        id="icon"
      />
      <strong>${Math.round(
        forecastFive.main.temp_max
      )}º</strong> | ${Math.round(forecastFive.main.temp_min)}º
    </div>
  `;
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city");
  let apiKey = "42c9623fedf9da69c2db0d440f0b16d7";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}
let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", showCity);

// Search by Current Position--------------------------------------------

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;

  celsiusTemperature = response.data.main.temp;
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

function showForecast(response) {
  let forecast1Element = document.querySelector(".day-first");
  let forecastOne = response.data.list[7];
  forecast1Element.innerHTML = `
    <div class="day-first">
      ${formatForecast(forecastOne.dt_txt)}
      <img
        src="https://raw.githubusercontent.com/BrunaBibs/weather-app/master/icons/${
          forecastOne.weather[0].icon
        }.png"
        alt="clear"
        id="icon"
      />
      <strong>${Math.round(forecastOne.main.temp_max)}º</strong> | ${Math.round(
    forecastOne.main.temp_min
  )}º
    </div>
  `;
  let forecast2Element = document.querySelector(".day-second");
  let forecastTwo = response.data.list[15];
  forecast2Element.innerHTML = `
    <div class="day-second">
      ${formatForecast(forecastTwo.dt_txt)}
      <img
        src="https://raw.githubusercontent.com/BrunaBibs/weather-app/master/icons/${
          forecastTwo.weather[0].icon
        }.png"
        alt="clear"
        id="icon"
      />
      <strong>${Math.round(forecastTwo.main.temp_max)}º</strong> | ${Math.round(
    forecastTwo.main.temp_min
  )}º
    </div>
  `;
  let forecast3Element = document.querySelector(".day-third");
  let forecastThree = response.data.list[23];
  forecast3Element.innerHTML = `
    <div class="day-third">
      ${formatForecast(forecastThree.dt_txt)}
      <img
        src="https://raw.githubusercontent.com/BrunaBibs/weather-app/master/icons/${
          forecastThree.weather[0].icon
        }.png"
        alt="clear"
        id="icon"
      />
      <strong>${Math.round(
        forecastThree.main.temp_max
      )}º</strong> | ${Math.round(forecastThree.main.temp_min)}º
    </div>
  `;
  let forecast4Element = document.querySelector(".day-fourth");
  let forecastFour = response.data.list[31];
  forecast4Element.innerHTML = `
    <div class="day-fourth">
      ${formatForecast(forecastFour.dt_txt)}
      <img
        src="https://raw.githubusercontent.com/BrunaBibs/weather-app/master/icons/${
          forecastFour.weather[0].icon
        }.png"
        alt="clear"
        id="icon"
      />
      <strong>${Math.round(
        forecastFour.main.temp_max
      )}º</strong> | ${Math.round(forecastFour.main.temp_min)}º
    </div>
  `;
  let forecast5Element = document.querySelector(".day-fifth");
  let forecastFive = response.data.list[39];
  forecast5Element.innerHTML = `
    <div class="day-fifth">
      ${formatForecast(forecastFive.dt_txt)}
      <img
        src="https://raw.githubusercontent.com/BrunaBibs/weather-app/master/icons/${
          forecastFive.weather[0].icon
        }.png"
        alt="clear"
        id="icon"
      />
      <strong>${Math.round(
        forecastFive.main.temp_max
      )}º</strong> | ${Math.round(forecastFive.main.temp_min)}º
    </div>
  `;
}

function retrievePosition(position) {
  let apiKey = "42c9623fedf9da69c2db0d440f0b16d7";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);

  url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showForecast);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);

//---------------Convert to Fahrenheit-----------------------

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#temperature-fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

//---------------Convert to Celsius---------------------------

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#temperature-celsius");
celsiusLink.addEventListener("click", showCelsius);
