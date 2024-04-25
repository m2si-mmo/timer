const timerSound = new Audio("countdown.mp3");
const timerTypeSelect = document.getElementById("timer-type");
const startButton = document.getElementById("start-timer");
const pauseButton = document.getElementById("pause-timer");
const resetButton = document.getElementById("reset-timer");
const hoursInput = document.getElementById("countdown-hours");
const minutesInput = document.getElementById("countdown-minutes");
const secondsInput = document.getElementById("countdown-seconds");
const hoursDisplay = document.getElementById("hours");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const timerSizeSelect = document.getElementById("timer-size");
const timerElement = document.getElementById("timer");
const timerColorInput = document.getElementById("timer-color");

timerColorInput.addEventListener("change", () => {
  timerElement.style.color = timerColorInput.value;
});

const darkModeSwitch = document.getElementById("dark-mode-switch");

darkModeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
});


let timerInterval;
let currentTime = 0;
let isPaused = true;

function updateTimeDisplay() {
  const hours = Math.floor(currentTime / 3600);
  const minutes = Math.floor((currentTime % 3600) / 60);
  const seconds = currentTime % 60;

  hoursDisplay.textContent = String(hours).padStart(2, "0");
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");

  if (hours === 0 && minutes === 0 && seconds === 0) {
    timerSound.play();
  }
}


function startTimer() {
  isPaused = false;
  timerInterval = setInterval(() => {
    if (!isPaused) {
      if (timerTypeSelect.value === "count-down" && currentTime === 0) {
        clearInterval(timerInterval);
        return;
      }

      timerTypeSelect.value === "count-up" ? currentTime++ : currentTime--;
      updateTimeDisplay();
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = true;
}

function resetTimer() {
  isPaused = true;
  clearInterval(timerInterval);

  if (timerTypeSelect.value === "count-up") {
    currentTime = 0;
  } else {
    currentTime =
      parseInt(hoursInput.value) * 3600 +
      parseInt(minutesInput.value) * 60 +
      parseInt(secondsInput.value);
  }

  updateTimeDisplay();
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

timerSizeSelect.addEventListener("change", () => {
  timerElement.classList.remove("timer-small", "timer-medium", "timer-large");
  timerElement.classList.add(`timer-${timerSizeSelect.value}`);
});

resetTimer();
