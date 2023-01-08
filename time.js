const time = document.getElementById("time");
const day = document.getElementById("day");
const month = document.getElementById("month");
const date = document.getElementById("date");
const year = document.getElementById("year");

const dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const displayTime = () => {
  const d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();

  if (h >= 6 && h <= 18) {
    document.body.style.background = `linear-gradient(#65c2f5, #b0d6f5)`;
    document.body.style.color = `#ffffff`;
  } else {
    document.body.style.background = `linear-gradient(#131862, #546bab)`;
    document.body.style.color = `#ffffff`;
  }

  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s; 

  time.innerHTML = `${h}:${m}:${s}`;
  day.innerHTML = dayArr[d.getDay()];
  month.innerHTML = monthArr[d.getMonth()];
  date.innerHTML = d.getDate();
  year.innerHTML = d.getFullYear();

  setInterval(displayTime, 1000);
};

displayTime();
