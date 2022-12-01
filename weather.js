const city = document.getElementById("city");
const coord = document.getElementById("coordinates");
const temp = document.getElementById("temperature");
const weather = document.getElementById("weather");
const minMaxTemp = document.getElementById("min-max-temp");
const input = document.getElementById("search-input");

const APIKey = "a0f8477cb9901f90fe0e1fb2f422273b";

const displaySearchLocation = () => {
  let location = input.value;

  getCoordinates(location);
};

const displayCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

const showPosition = (position) => {
  getCity(position.coords.latitude, position.coords.longitude);
  getWeather(position.coords.latitude, position.coords.longitude);
};

const showError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
    default:
      break;
  }
};

const getCoordinates = (city) => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((response) => {
      let lat = response[0].lat;
      let lon = response[0].lon;
      getCity(lat, lon);
      getWeather(lat, lon);
    })
    .catch((error) => alert(error));
};

const getCity = (lat, lon) => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((response) => {
      city.innerHTML = `${response[0].name}`;
      coord.innerHTML = `Lat: ${lat.toFixed(2)} - Lon: ${lon.toFixed(2)}`;
    })
    .catch((error) => alert(error));
};

const getWeather = (lat, lon) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`
  )
    .then((response) => response.json())
    .then((response) => {
      temp.innerHTML = `${response.main.temp}&#176;`;
      weather.innerHTML = `${response.weather[0].main}`;
      minMaxTemp.innerHTML = `H: ${response.main.temp_max}&#176; - L: ${response.main.temp_min}&#176;`;
    })
    .catch((error) => alert(error));
};
