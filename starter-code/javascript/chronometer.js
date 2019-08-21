const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let characterInstanceArr = [];
let currentTime = 0;
let intervalId;
// const mariosImages = {
//   first: "https://bit.ly/2L7yH3f",
//   second: "https://bit.ly/2L3ikoe"
// };
// const mariosImages = {
//   first: "./images/Mario.png"
//   second: "./images/MarioBW.png"
// };

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 68;
    this.height = 140;
    this.intervalId;
    this.instanceTimer = [];
    this.instanceKeyPressed = [];
    this.masterTimer = [0];
    this.image = new Image();
    this.image.src = "./images/color/frontman.png";
  }

  moveLeft() {
    this.x -= 7;
  }

  moveRight() {
    this.x += 7;
  }

  jump() {
    this.y -= 100;
    console.log(this.y);
  }
}

function drawPresent() {
  // let currentCharacter = chronometerInstanceArr[chronometerCurrentInstance];
  if (currentCharacter.y < 250) currentCharacter.y += 4;
  // if (frames % 10 === 0) {
  //   this.image = this.image === this.image1 ? this.image2 : this.image1;
  // }
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
  }, 1000 / 24);
}

function generateCharacter(x, y) {
  character = new Character(x, y);
  characterInstanceArr.push(character);
}

function replay() {
  if (characterInstanceArr.length > 1) {
    for (let i = 0; i < characterInstanceArr.length - 1; i++) {
      characterInstanceArr[i].image.src = "./images/gray/frontman.png";
      if (characterInstanceArr[i].y < 250) characterInstanceArr[i].y += 4;
      for (let j = 0; j < characterInstanceArr[i].instanceTimer.length; j++) {
        if (currentTime == characterInstanceArr[i].instanceTimer[j])
          // console.log("Time equal!!");
          switch (characterInstanceArr[i].instanceKeyPressed[j]) {
            case "Left":
              characterInstanceArr[i].moveLeft();
              break;
            case "Right":
              characterInstanceArr[i].moveRight();
              break;
            case "Up":
              characterInstanceArr[i].jump();
              break;
          }

        ctx.drawImage(
          characterInstanceArr[i].image,
          characterInstanceArr[i].x,
          characterInstanceArr[i].y,
          characterInstanceArr[i].width,
          characterInstanceArr[i].height
        );
      }
    }
  }
}
