var min = document.querySelector(".min");
var sec = document.querySelector(".sec");
var startButton = document.querySelector(".start");
var stopButton = document.querySelector(".stop");
var pauseButton = document.querySelector(".pause");
var minutesInput = document.querySelector(".minutes");
var secondsInput = document.querySelector(".seconds");
var timeDiv = document.querySelector(".time");
var intervalID;
var gameOver = false;

function initialTimer(min, sec) {
  minutesInput.value = min;
  secondsInput.value = sec;
  setTimer();
}

function setTimer() {
  min.innerText =
    minutesInput.value >= 0 ? ("0" + minutesInput.value).slice(-2) : "00";
  sec.innerText =
    secondsInput.value >= 0 ? ("0" + secondsInput.value).slice(-2) : "00";
}

initialTimer(0, 3);

minutesInput.onchange = setTimer;
secondsInput.onchange = setTimer;

var spinnerHtml =
  "<div class='lds-spinner'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>";

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
pauseButton.addEventListener("click", pauseTimer);

async function showCat() {
  var res = await fetch("https://aws.random.cat/meow");
  timeDiv.innerHTML = spinnerHtml;
  var json = await res.json();
  timeDiv.innerHTML = `<img src="${json.file}" width="100em" height="100em">`;
}

function sayMeow() {
  var meow = new Audio();
  meow.src = "/elior-gispan.github.io\\meow.mp3";
  meow.play();
}

function stopTimer() {
  clearInterval(intervalID);
  if (gameOver) {
    // TODO hiding the image of the cat;
  }
  setTimer();
  startButton.disabled = false;
  startButton.style.backgroundColor = "rgb(68, 199, 68)";
  minutesInput.disabled = false;
  secondsInput.disabled = false;
}

function pauseTimer() {
  clearInterval(intervalID);
  startButton.disabled = false;
  startButton.style.backgroundColor = "rgb(68, 199, 68)";
  minutesInput.disabled = false;
  secondsInput.disabled = false;
}

function startTimer() {
  startButton.disabled = true;
  startButton.style.backgroundColor = "#cccccc";
  minutesInput.disabled = true;
  secondsInput.disabled = true;
  intervalID = setInterval(() => {
    var seconds = +sec.innerText;
    var minutes = +min.innerText;
    if (seconds > 0) {
      seconds--;
    } else {
      if (minutes > 0) {
        minutes--;
        seconds = 59;
        min.innerText = ("0" + minutes).slice(-2);
      } else {
        showCat();
        stopTimer();
        sayMeow();
        gameOver = true;
      }
    }
    sec.innerText = ("0" + seconds).slice(-2);
  }, 1000);
}
