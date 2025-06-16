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

// CSS QUIZE
const questionContainer = document.querySelector(".access-question--container");
const resultCount = document.querySelector(".result-box .result-count");
const resultLength = document.querySelector(".result-box .question-length");
const resultBox = document.querySelector(".result-box");
const optionsContainer = document.querySelector(
  ".css-question--container .access-question--bottom .access-buttons div"
);
const error = document.querySelector(".error-container");
const nextBtn = document.querySelector(
  ".css-question--container .access-question--bottom .access-buttons .button-submit"
);

async function fetchData() {
  const res = await fetch("./data.json");
  const data = await res.json();
  return data;
}

async function displayHTMLQuiz(index) {
  const results = await fetchData();
  const data = results.quizzes[1].questions;

  //   Question Count
  const questionCountContent = document.querySelector(
    ".css-question--container .css-question-text .question-count"
  );
  const quesCountTag = ` <span class="count">Question <span>${
    index + 1
  }</span> of <span>${data.length}</span></span>`;
  questionCountContent.innerHTML = quesCountTag;

  //   Question
  const cssQuestionText = document.querySelector(
    ".css-question--container .css-question-text h2"
  );
  const questionTag = ` <span>${data[index].question}</span>`;
  cssQuestionText.innerHTML = questionTag;

  //   Options

  const optiontags =
    '<button class="btn btn-css"><div><span>A</span><div class="choice">' +
    escapeHTML(data[index].options[0]) +
    "</div></div><div></div></button>" +
    '<button class="btn btn-css"><div><span>B</span><div class="choice">' +
    escapeHTML(data[index].options[1]) +
    "</div></div><div></div></button>" +
    '<button class="btn btn-css"><div><span>C</span><div class="choice">' +
    escapeHTML(data[index].options[2]) +
    "</div></div><div></div></button>" +
    '<button class="btn btn-css"><div><span>D</span> <div class="choice">' +
    escapeHTML(data[index].options[3]) +
    "</div></div><div></div></button>";
  optionsContainer.innerHTML = optiontags;

  const option = optionsContainer.querySelectorAll(".btn-css");

  for (let i = 0; i < option.length; i++) {
    option[i].addEventListener("click", () => {
      optionSelected(option[i].children[0].children[1], index);
    });
  }
}
const tick = `<div><img src="./assets/images/icon-correct.svg" alt=""></div>`;
const cross = ` <div><img src="./assets/images/icon-incorrect.svg" alt=""></div>`;

let correct = 0;
async function optionSelected(answer, index) {
  const results = await fetchData();
  const data = results.quizzes[1].questions;
  let userAns = answer.textContent;

  let correctAnser = data[index].answer;

  let allOptions = optionsContainer.children.length;
  answer.parentElement.parentElement.classList.add("clicked");

  if (userAns === correctAnser) {
    correct += 1;
    resultCount.textContent = correct;
    resultLength.textContent = `${data.length}`;
  }
  for (let i = 0; i < allOptions; i++) {
    optionsContainer.children[i].setAttribute("id", "done");
  }

  document.querySelector(".button-submit").addEventListener("click", () => {
    if (userAns === correctAnser) {
      answer.parentElement.parentElement.classList.add("correct");
      answer.parentElement.parentElement.insertAdjacentHTML("beforeend", tick);
    } else {
      answer.parentElement.parentElement.classList.add("incorrect");
      answer.parentElement.parentElement.insertAdjacentHTML("beforeend", cross);

      //   Show correct annswer if wrong one is chosen
      for (let i = 0; i < allOptions; i++) {
        let optionText = optionsContainer.children[i].children[0].children[1];
        if (optionText.textContent === correctAnser) {
          optionsContainer.children[i].setAttribute("class", "btn-css correct");
          optionsContainer.children[i].insertAdjacentHTML("beforeend", tick);
          optionsContainer.children[i].classList.add("disabled");
        }
      }
    }
  });

  for (let i = 0; i < allOptions; i++) {
    optionsContainer.children[i].classList.add("disabled");
  }
}

document.querySelector(".button-submit").addEventListener("click", () => {
  let allOptions = optionsContainer.children.length;
  for (let i = 0; i < allOptions; i++) {
    if (!optionsContainer.children[i].hasAttribute("id", "done")) {
      error.classList.remove("hidden");
      document.querySelector(".button-next").style.display = "none";
      document.querySelector(".button-submit").style.display = "block";
    } else {
      error.classList.add("hidden");
      document.querySelector(".button-submit").style.display = "none";
      document.querySelector(".button-next").style.display = "block";
    }
  }
});
function escapeHTML(str) {
  return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

let quesCount = 0;

// Next Button

document.querySelector(".button-next").addEventListener("click", async () => {
  const results = await fetchData();

  const data = results.quizzes[0].questions;
  const progressTag = document.querySelector(".progress");
  if (quesCount < data.length - 1) {
    quesCount++;
    displayHTMLQuiz(quesCount);
    progressTag.style.width = `${(quesCount / data.length) * 100}%`;
  } else {
    questionContainer.style.display = "none";
    resultBox.style.display = "grid";
  }
  document.querySelector(".button-next").style.display = "none";
  document.querySelector(".button-submit").style.display = "block";
});

document.addEventListener("DOMContentLoaded", () => {
  displayHTMLQuiz(0);
});
