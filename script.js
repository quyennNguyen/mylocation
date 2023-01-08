const city = document.getElementById("city");
const coord = document.getElementById("coordinates");
const temp = document.getElementById("temperature");
const weather = document.getElementById("weather");
const minMaxTemp = document.getElementById("min-max-temp");
const input = document.getElementById("search-input");

const APIKey = "a0f8477cb9901f90fe0e1fb2f422273b";

const displayLocalLocation = () => {
  stopTime();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getCity(position.coords.latitude, position.coords.longitude);
        getWeather(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
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
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

const displaySearchLocation = () => {
  stopTime();

  let location = input.value;

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${APIKey}`
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
      coord.innerHTML = `Lat:${lat.toFixed(
        2
      )}&nbsp;&nbsp;&nbsp;Lon:${lon.toFixed(2)}`;
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
      minMaxTemp.innerHTML = `H:${response.main.temp_max}&#176;&nbsp;&nbsp;&nbsp;L:${response.main.temp_min}&#176;`;
      searchTime(response.timezone, response.sys.sunrise, response.sys.sunset);
    })
    .catch((error) => alert(error));
};

// ----------------------------------------------------------------------

const time = document.getElementById("time");
const day = document.getElementById("day");
const month = document.getElementById("month");
const date = document.getElementById("date");
const year = document.getElementById("year");
let id1,
  id2 = 0;

const dayArr = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
const monthArr = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const searchTime = (timezone, sunrise, sunset) => {
  let lt = -(new Date().getTimezoneOffset() * 60 * 1000);
  let st = timezone * 1000;
  let sr = sunrise * 1000;
  let ss = sunset * 1000;
  let diff = lt - st;

  if (diff == 0) {
    if (id1 == 0) {
      const displayLocalTime = () => {
        displayTime(new Date(), sr, ss);
      };
      displayLocalTime();
      id1 = setInterval(displayLocalTime, 1000);
    }
  } else {
    if (id2 == 0) {
      const displaySearchTime = () => {
        displayTime(new Date(Date.now() - diff), sr, ss);
      };
      displaySearchTime();
      id2 = setInterval(displaySearchTime, 1000);
    }
  }
};

const displayTime = (d, sr, ss) => {
  let now = Date.now();

  if (now >= sr && now <= ss) {
    document.body.style.background = `linear-gradient(#65c2f5, #b0d6f5)`;
  } else {
    document.body.style.background = `linear-gradient(#131862, #546bab)`;
  }

  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  time.innerHTML = `${h}:${m}:${s}`;
  day.innerHTML = dayArr[d.getDay()];
  month.innerHTML = monthArr[d.getMonth()];
  date.innerHTML = d.getDate();
  year.innerHTML = d.getFullYear();
};

const stopTime = () => {
  clearInterval(id1);
  clearInterval(id2);
  id1 = id2 = 0;
};
