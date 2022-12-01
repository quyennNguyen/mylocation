const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
const day = document.getElementById("day");
const month = document.getElementById("month");
const date = document.getElementById("date");

const dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const displayTime = () => {
    const d = new Date();
    hour.innerHTML = `${d.getHours()}:`;
    minute.innerHTML = `${d.getMinutes()}:`;
    second.innerHTML = d.getSeconds();
    day.innerHTML = `${dayArr[d.getDay()]},&nbsp;`;
    month.innerHTML = `${monthArr[d.getMonth()]}&nbsp;`;
    date.innerHTML = d.getDate();
}

setInterval(displayTime, 1000);