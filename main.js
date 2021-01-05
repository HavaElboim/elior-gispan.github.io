var min = document.querySelector(".min");
var sec = document.querySelector(".sec");
var startButton = document.querySelector(".start");
var stopButton = document.querySelector(".stop");
var pauseButton = document.querySelector(".pause");
var minutesInput = document.querySelector(".minutes");
var secondsInput = document.querySelector(".seconds");
var timeDiv = document.querySelector(".time");
var catDiv = document.querySelector("#cat");
var intervalID;
var gameOver = false;

// var timeDivInitial = timeDiv.innerHTML;

function setTimer() {
  min.innerText = ("0" + minutesInput.value).slice(-2);
  sec.innerText = ("0" + secondsInput.value).slice(-2);
}

minutesInput.oninput = setTimer;
secondsInput.oninput = setTimer;

var spinnerHtml =
  "<div class='lds-spinner'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>";

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
pauseButton.addEventListener("click", pauseTimer);

function showCat() {
  fetch("https://aws.random.cat/meow")
    .then(function (res) {
      timeDiv.style.display = "none";
      catDiv.style.display = "flex";

      catDiv.innerHTML = spinnerHtml;
      return res.json();
    })
    .then(function (json) {
      catDiv.innerHTML = `<img src="${json.file}" width="100em" height="100em">`;
      // console.log("cat", catDiv);
      setTimeout(function () {
        catDiv.innerHTML = "";
        catDiv.style.display = "none";
        timeDiv.style.display = "flex";
      }, 5000);
    });
}

function sayMeow() {
  var meow = new Audio();
  meow.src = "/meow.mp3";
  meow.play();
}

function stopTimer() {
  clearInterval(intervalID);
  // if (gameOver) {
  //   // TODO hiding the image of the cat;
  // }
  minutesInput.disabled = false;
  secondsInput.disabled = false;
  setTimer();
  startButton.disabled = false;
  startButton.style.backgroundColor = "rgb(68, 199, 68)";
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
        stopTimer();
        sayMeow();
        showCat();
        gameOver = true;
      }
    }
    sec.innerText = ("0" + seconds).slice(-2);
  }, 1000);
}
