let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let lapCount = 1;

function updateDisplay() {
  const hours = Math.floor(elapsedTime / 3600000);
  const minutes = Math.floor((elapsedTime % 3600000) / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = Math.floor((elapsedTime % 1000) / 10);

  document.getElementById("hours").textContent = pad(hours);
  document.getElementById("minutes").textContent = pad(minutes);
  document.getElementById("seconds").textContent = pad(seconds);
  document.getElementById("milliseconds").textContent = pad(milliseconds);
}

function pad(number) {
  return number.toString().padStart(2, "0");
}

function handleStartPause() {
  const button = document.getElementById("startPause");
  if (!isRunning) {
    isRunning = true;
    button.textContent = "Pause";
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  } else {
    isRunning = false;
    button.textContent = "Resume";
    clearInterval(timerInterval);
  }
}

function handleReset() {
  isRunning = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  lapCount = 1;
  updateDisplay();
  document.getElementById("startPause").textContent = "Start";
  document.getElementById("lapsContainer").innerHTML =
    "<h3>Recorded Times:</h3>";
}

function handleLap() {
  if (elapsedTime <= 0) return;

  const lapsContainer = document.getElementById("lapsContainer");
  const lapEntry = document.createElement("div");
  lapEntry.className = "lap-entry";

  const timestamp = new Date().toLocaleTimeString();
  const lapTime = `${pad(Math.floor(elapsedTime / 3600000))}:${pad(
    Math.floor((elapsedTime % 3600000) / 60000)
  )}:${pad(Math.floor((elapsedTime % 60000) / 1000))}.${pad(
    Math.floor((elapsedTime % 1000) / 10)
  )}`;

  lapEntry.innerHTML = `
          <div>
              <span style="color: #c8e6c9">Lap ${lapCount++}</span>
              <span style="margin-left: 20px">${timestamp}</span>
          </div>
          <div>
              <input type="text" class="owner-input" placeholder="Owner's name">
              <span style="margin-left: 15px">${lapTime}</span>
          </div>
      `;

  lapsContainer.appendChild(lapEntry);
}
