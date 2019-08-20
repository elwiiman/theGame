const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let chronometerInstanceArr = [];
let currentTime = 0;
let intervalId;

class Chronometer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 120;
    this.intervalId;
    this.instanceTimer = [];
    this.instanceKeyPressed = [];
    this.masterTimer = [0];
    this.image = new Image();
    this.image.src = "https://bit.ly/2L7yH3f";
  }
}

function drawPresent() {
  // let currentCharacter = chronometerInstanceArr[chronometerCurrentInstance];

  ctx.drawImage(
    currentCharacter.image,
    currentCharacter.x,
    currentCharacter.y,
    currentCharacter.width,
    currentCharacter.height
  );
}

// getMinutes() {
//   let minutes = 0;
//   minutes = Math.floor(this.currentTime / 60);
//   return minutes;
// }
// getSeconds() {
//   let seconds = 0;
//   seconds = this.currentTime % 60;
//   return seconds;
// }

// twoDigitsNumber(number) {
//   if (number.toString().length < 2) {
//     number = number.toString();
//     let finalNumber = "0" + number;
//     return finalNumber;
//   } else {
//     return number.toString();
//   }
// }

function stopClick() {
  console.log("stop", intervalId);
  clearInterval(intervalId);
}

function resetClick() {
  currentTime = 0;
}

function splitClick() {
  return this.currentTime;
}

function startClick() {
  intervalId = setInterval(() => {
    currentTime += 1;
    // console.log(currentTime);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentCharacter.masterTimer.push(currentTime);
    drawPresent();
    replay();
  }, 1000 / 60);
}

function generateCharacter(x, y) {
  character = new Chronometer(x, y);
  chronometerInstanceArr.push(character);
}

function replay() {
  if (chronometerInstanceArr.length > 1) {
    for (let i = 0; i < chronometerInstanceArr.length - 1; i++) {
      for (let j = 0; j < chronometerInstanceArr[i].instanceTimer.length; j++) {
        if (currentTime == chronometerInstanceArr[i].instanceTimer[j])
          // console.log("Time equal!!");
          switch (chronometerInstanceArr[i].instanceKeyPressed[j]) {
            case "Left":
              chronometerInstanceArr[i].x -= 7;
              break;
            case "Right":
              chronometerInstanceArr[i].x += 7;
              break;
          }
        ctx.drawImage(
          chronometerInstanceArr[i].image,
          chronometerInstanceArr[i].x,
          chronometerInstanceArr[i].y,
          chronometerInstanceArr[i].width,
          chronometerInstanceArr[i].height
        );
      }
    }
  }
}
