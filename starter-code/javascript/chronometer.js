const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let characterInstanceArr = [];
let currentTime = 0;
let intervalId;
let friction = 0.62;
let yFriction = 0.49;
// const mariosImages = {
//   first: "https://bit.ly/2L7yH3f",
//   second: "https://bit.ly/2L3ikoe"
// };

const buttonImages = {
  buttonUp: "./images/buttonUp.png",
  buttonDown: "./images/buttonDown.png"
};

const characterImages = {
  frontman: "./images/color/frontman.png",
  right: "./images/color/manright.png",
  left: "./images/color/manleft.png",
  rightWalk: "./images/color/manWalkright.png",
  leftWalk: "./images/color/manWalkLeft.png"
};

const characterGrayImages = {
  frontman: "./images/gray/frontman.png",
  right: "./images/gray/manright.png",
  left: "./images/gray/manleft.png",
  rightWalk: "./images/gray/manWalkright.png",
  leftWalk: "./images/gray/manWalkLeft.png"
};

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 53;
    this.height = 125;
    this.intervalId;
    this.instanceTimer = [];
    this.instanceKeyPressed = [];
    this.imageFrontman = new Image();
    this.imageFrontman.src = characterImages.frontman;
    this.imageLeft = new Image();
    this.imageLeft.src = characterImages.left;
    this.imageRight = new Image();
    this.imageRight.src = characterImages.right;
    this.imageWalkLeft = new Image();
    this.imageWalkLeft.src = characterImages.leftWalk;
    this.imageWalkRight = new Image();
    this.imageWalkRight.src = characterImages.rightWalk;
    this.image = this.imageFrontman;
    this.isInPast = false;
    this.isJumping = false;
    this.xVelocity = 0;
    this.yVelocity = 0;
  }

  moveLeft() {
    this.xVelocity -= 3.8;
    this.image = this.imageLeft;
    this.animationLeft();
  }

  moveRight() {
    this.xVelocity += 3.8;
    this.image = this.imageRight;
    this.animationRight();
  }

  jump() {
    this.isJumping = true;
    this.yVelocity -= 135;
    // console.log(this.y);
  }

  animationRight() {
    if (currentTime % 4 === 0) {
      this.image =
        this.image === this.imageRight ? this.imageWalkRight : this.imageRight;
    }
  }

  animationLeft() {
    if (currentTime % 4 === 0) {
      this.image =
        this.image === this.imageLeft ? this.imageWalkLeft : this.imageLeft;
    }
  }

  animationJumpLeft() {
    this.image = this.imageWalkLeft;
  }

  animationJumpRight() {
    this.image = this.imageWalkRight;
  }

  pastImagesAssign() {
    this.imageFrontman.src = characterGrayImages.frontman;
    this.imageLeft.src = characterGrayImages.left;
    this.imageRight.src = characterGrayImages.right;
    this.imageWalkLeft.src = characterGrayImages.leftWalk;
    this.imageWalkRight.src = characterGrayImages.rightWalk;
    this.image = this.imageFrontman;
  }

  fall() {
    this.yVelocity += 6.8; // effect of gravity
    if (this.y > 768 - 378 - 125) {
      //125 is height of character,
      //378 is distance between border botom of canvas to foot of the character,
      //768 is height of canvas
      this.isJumping = false;
      this.y = 250;
      this.yVelocity = 0;
    }
  }
}

class BlueButton {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 85;
    this.height = 35;
    this.image = new Image();
    this.image.src = buttonImages.buttonUp;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

function drawPresent() {
  button.draw();
  if (currentCharacter.isJumping == true) {
    currentCharacter.fall();
  }

  ctx.drawImage(
    currentCharacter.image,
    (currentCharacter.x += currentCharacter.xVelocity),
    (currentCharacter.y += currentCharacter.yVelocity),
    currentCharacter.width,
    currentCharacter.height
  );
  currentCharacter.xVelocity *= friction;
  currentCharacter.yVelocity *= yFriction;
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    controllerCheck();
    replay();
    drawPresent();
    // console.log(currentCharacter.x, currentCharacter.y);
  }, 1000 / 35);
}

function generateCharacter(x, y) {
  character = new Character(x, y);
  characterInstanceArr.push(character);
}

function replay() {
  if (characterInstanceArr.length > 1) {
    for (let i = 0; i < characterInstanceArr.length - 1; i++) {
      if (characterInstanceArr[i].isJumping == true) {
        characterInstanceArr[i].fall();
      }
      ctx.drawImage(
        characterInstanceArr[i].image,
        (characterInstanceArr[i].x += characterInstanceArr[i].xVelocity),
        (characterInstanceArr[i].y += characterInstanceArr[i].yVelocity),
        characterInstanceArr[i].width,
        characterInstanceArr[i].height
      );
      characterInstanceArr[i].xVelocity *= friction;
      characterInstanceArr[i].yVelocity *= yFriction;
      // if (characterInstanceArr[i].y < 250) characterInstanceArr[i].y += 4;
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
              if (characterInstanceArr[i].isJumping !== true) {
                characterInstanceArr[i].jump();
              }
              break;
            case "jumpLeft":
              characterInstanceArr[i].animationJumpLeft();
              break;
            case "jumpRight":
              characterInstanceArr[i].animationJumpRight();
              break;
          }
      }
    }
  }
}
