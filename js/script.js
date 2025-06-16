// Dark and Light Mode variABLES
const toggleSwitcher = document.querySelector('input[type="checkbox"]');
const iconSun = document.getElementById("icon-sun");
const iconMoon = document.getElementById("icon-moon");
// media query
const x = window.matchMedia("(min-width:75em)");
const y = window.matchMedia("(min-width:37.5em)");

// Icon color function
function iconColor(color) {
  iconSun.src = `./assets/images/icon-sun-${color}.svg`;
  iconMoon.src = `./assets/images/icon-moon-${color}.svg`;
}

// BG Pattern and Color Function
function bgPatternColor(colorCode, color) {
  if (x.matches) {
    document.body.style.background = `${colorCode} url(./assets/images/pattern-background-desktop-${color}.svg)`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  } else if (y.matches) {
    document.body.style.background = `${colorCode} url(./assets/images/pattern-background-tablet-${color}.svg)`;
    document.body.style.backgroundRepeat = "no-repeat";
  } else {
    document.body.style.background = `${colorCode} url(./assets/images/pattern-background-mobile-${color}.svg)`;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
  }
}
// Dark Mode Function
function darkMode() {
  iconColor("light");
  bgPatternColor("#313e51", "dark");
}

// Light Mode Function
function lightMode() {
  iconColor("dark");
  bgPatternColor("#f4f6fa", "light");
}
// Switcher
function switchMode(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    darkMode();
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    lightMode();
    localStorage.setItem("theme", "light");
  }
}
toggleSwitcher.addEventListener("change", switchMode);

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitcher.checked = true;
    darkMode();
  }
}

// Quiz Button Sections
async function fetchData() {
  const res = await fetch("./data.json");
  const data = await res.json();
  return data;
}

async function displayDataHome() {
  const results = await fetchData();
  const data = results.quizzes;

  const homeContainer = document.querySelector(".hero-bottom .buttons");
  const homebuttonsTag = `<a href="html-quiz.html" class="link link-html"><button class="btn btn-html"><span><img src="${data[0].icon}" width="28.57" height="28.57" alt=""/></span> ${data[0].title} </button> </a>
            <a href="css-quiz.html" class="link link-css"> <button class="btn btn-css"> <span ><img src="${data[1].icon}" width="28.57" height="28.57" alt="" /></span> ${data[1].title} </button> </a> <a href="js-quiz.html" class="link link-js"> <button class="btn btn-js"><span><img src="${data[2].icon}" width="28.57" height="28.57" alt="" /></span>${data[2].title} </button></a> <a href="access-quiz.html" class="link link-acc"> <button class="btn btn-access"> <span ><img src="${data[3].icon}" width="28.57" height="28.57" alt="" /></span> ${data[3].title} </button> </a>`;
  homeContainer.innerHTML = homebuttonsTag;
}

document.addEventListener("DOMContentLoaded", displayDataHome);
