//api key=RXHCLBHCL43ZN59FYNT5UGWGX
//https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY
async function getAPIData(city) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=RXHCLBHCL43ZN59FYNT5UGWGX`
  );
  const data = await response.json();
  return data;
}

function myData(data) {
  const dataObject = {
    description: data.description,
    temp: data.currentConditions.temp,
    feelslike: data.currentConditions.feelslike,
    humidity: data.currentConditions.humidity,
    icon: data.currentConditions.icon,
    sunrise: data.currentConditions.sunrise,
    sunset: data.currentConditions.sunset,
  };
  return dataObject;
}

// Mapping API icon IDs to class names
const weatherIconMap = {
  snow: "wi-snow",
  rain: "wi-rain",
  fog: "wi-fog",
  wind: "wi-windy",
  cloudy: "wi-cloudy",
  "partly-cloudy-day": "wi-day-cloudy",
  "partly-cloudy-night": "wi-night-alt-cloudy",
  "clear-day": "wi-day-sunny",
  "clear-night": "wi-night-clear",
  "snow-showers-day": "wi-day-sleet",
  "snow-showers-night": "wi-night-alt-sleet",
  "thunder-rain": "wi-thunderstorm",
  "thunder-showers-day": "wi-day-thunderstorm",
  "thunder-showers-night": "wi-night-alt-thunderstorm",
  "showers-day": "wi-day-showers",
  "showers-night": "wi-night-showers",
};

function getWeatherIcon(iconId) {
  return weatherIconMap[iconId] || "wi-day-sunny";
}

async function main(city) {
  const getData = await getAPIData(city);
  const finalData = await myData(getData);
  console.log(finalData); //we now have the data we require

  //adding new data to html elements
  const locHTML = document.querySelector(".location");
  locHTML.textContent = city;

  const mainIcon = document.querySelector(".icon");
  {
    mainIcon.className = "icon"; // Resets all classes on the icon element
    let weatherIcon = getWeatherIcon(finalData.icon);
    mainIcon.classList.add(weatherIcon); //adding the icon class
    mainIcon.classList.add("wi");
  }

  const descriptionHTML = document.querySelector(".description");
  descriptionHTML.textContent = ""; //clears previous textContent
  descriptionHTML.textContent = finalData.description;

  const tempHTML = document.querySelector(".temp-info");
  tempHTML.textContent = ""; //clear
  tempHTML.textContent = finalData.temp;

  const feelslikeHTML = document.querySelector(".feelslike-info");
  feelslikeHTML.textContent = ""; //clear
  feelslikeHTML.textContent = finalData.feelslike;

  const humidityHTML = document.querySelector(".humidity-info");

  humidityHTML.textContent = ""; // clear
  humidityHTML.textContent = finalData.humidity;

  const sunriseHTML = document.querySelector(".sunrise-info");
  sunriseHTML.textContent = "";
  sunriseHTML.textContent = finalData.sunrise;

  const sunsetHTML = document.querySelector(".sunset-info");
  sunsetHTML.textContent = "";
  sunsetHTML.textContent = finalData.sunset;
}

const searchBar = document.querySelector(".search-bar");
const searchButton = document.querySelector(".search-button");

searchButton.addEventListener("click", () => {
  const city = searchBar.value;
  main(city);
});
