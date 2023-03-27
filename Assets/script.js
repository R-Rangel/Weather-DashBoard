const API_KEY = "01a66f93c654b3c824c4592623ea7bf4";

const form = document.querySelector("form");
const cityInput = document.querySelector("#city");
const forecastContainer = document.querySelector("#forecast");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      // clear previous forecast data
      forecastContainer.innerHTML = "";

      // loop through the forecast data and display it
      for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        const forecastDate = new Date(forecast.dt * 1000).toLocaleDateString(
          "en-US"
        );
        const forecastIcon = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
        const forecastTemp = Math.round(forecast.main.temp - 273.15) + "°C";
        const forecastWind = Math.round(forecast.wind.speed * 3.6) + " km/h";
        const forecastHumidity = forecast.main.humidity + "%";

        const forecastItem = document.createElement("div");
        forecastItem.classList.add("forecast-item");

        const forecastDateElement = document.createElement("div");
        forecastDateElement.classList.add("forecast-date");
        forecastDateElement.innerText = forecastDate;

        const forecastIconElement = document.createElement("img");
        forecastIconElement.classList.add("forecast-icon");
        forecastIconElement.setAttribute("src", forecastIcon);

        const forecastTempElement = document.createElement("div");
        forecastTempElement.classList.add("forecast-temp");
        forecastTempElement.innerText = `Temperature: ${forecastTemp}`;

        const forecastWindElement = document.createElement("div");
        forecastWindElement.classList.add("forecast-wind");
        forecastWindElement.innerText = `Wind: ${forecastWind}`;

        const forecastHumidityElement = document.createElement("div");
        forecastHumidityElement.classList.add("forecast-humidity");
        forecastHumidityElement.innerText = `Humidity: ${forecastHumidity}`;

        forecastItem.appendChild(forecastDateElement);
        forecastItem.appendChild(forecastIconElement);
        forecastItem.appendChild(forecastTempElement);
        forecastItem.appendChild(forecastWindElement);
        forecastItem.appendChild(forecastHumidityElement);

        forecastContainer.appendChild(forecastItem);
      }
    })
    .catch((error) => console.log(error));
});
