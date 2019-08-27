const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let characterInstanceArr = [];
let currentTime = 0;
let intervalId;
let friction = 0.55;
let yFriction = 0.49;
// let levelGround = 768 - 378 - 125;
//125 is height of character,
//378 is distance between border botom of canvas to foot of the character,
//768 is height of canvas

// const mariosImages = {
//   first: "https://bit.ly/2L7yH3f",
//   second: "https://bit.ly/2L3ikoe"
// };
const groundImage = "./images/ground.png";

const plattformImages = {
  plattformBase: "./images/plattform/plattformBase.png",
  plattformTop: "./images/plattform/plattformTop.png",
  plattform: "./images/plattform/plattform.png"
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

class Ground {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = canvas.width + 10;
    this.height = 50;
    this.image = new Image();
    this.image.src = groundImage;
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

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
    this.isGrounded = false;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.isCollidedRight = false;
    this.isCollidedLeft = false;
    this.isCollidedTop = false;
    this.isCollidedBottom = false;
  }

  colChecker(shapeB) {
    // get the vectors to check against
    let vX = this.x + this.width / 2 - (shapeB.x + shapeB.width / 2),
      vY = this.y + this.height / 2 - (shapeB.y + shapeB.height / 2),
      // add the half widths and half heights of the objects
      hWidths = this.width / 2 + shapeB.width / 2,
      hHeights = this.height / 2 + shapeB.height / 2,
      colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
      // figures out on which side we are colliding (top, bottom, left, or right)
      let oX = hWidths - Math.abs(vX),
        oY = hHeights - Math.abs(vY);
      if (oX >= oY) {
        if (vY > 0) {
          // console.log("t");
          colDir = "t";
          this.y += oY;
          this.yVelocity *= -1;
        } else {
          // console.log("b");
          colDir = "b";
          this.y -= oY;
          this.isJumping = false;
          this.isGrounded = true;
        }
      } else {
        if (vX > 0) {
          // console.log("r");
          colDir = "r";
          this.x += oX;
          this.xVelocity = 0;
        } else {
          this.xVelocity = 0;
          // console.log("l");
          colDir = "l";
          this.x -= oX;
        }
      }
    }
    return colDir;
  }

  moveLeft() {
    this.xVelocity -= 3.5;
    this.image = this.imageLeft;
    this.animationLeft();
  }

  moveRight() {
    this.xVelocity += 3.5;
    this.image = this.imageRight;
    this.animationRight();
  }

  jump() {
    this.isJumping = true;
    this.yVelocity -= 100;
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
    this.yVelocity += 9.8; // effect of gravity
    // if ((this.isGrounded = true)) {
    // }
  }
}

class BlueButton {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 85;
    this.height = 18;
    this.maxY = y;
    this.minY = y - 20;
    this.imagePlattform = new Image();
    this.imagePlattform.src = plattformImages.plattform;
    this.imagePlattformBase = new Image();
    this.imagePlattformBase.src = plattformImages.plattformBase;
    this.imagePlattformTop = new Image();
    this.imagePlattformTop.src = plattformImages.plattformTop;
    this.active = false;
  }

  colChecker(shapeB) {
    // get the vectors to check against
    let vX = this.x + this.width / 2 - (shapeB.x + shapeB.width / 2),
      vY = this.y + this.height / 2 - (shapeB.y + shapeB.height / 2),
      // add the half widths and half heights of the objects
      hWidths = this.width / 2 + shapeB.width / 2,
      hHeights = this.height / 2 + shapeB.height / 2;

    console.log(
      "vX: " + vX,
      "hwidths: " + hWidths,
      "vY: " + vY,
      "hHeights: " + hHeights
    );

    let condition = Math.abs(vX) < hWidths && Math.abs(vY) === hHeights;
    console.log("condition: " + condition);
    if (condition) {
      this.active = true;
    } else {
      this.active = false;
    }
  }

  draw() {
    ctx.drawImage(
      this.imagePlattformTop,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

function drawPlattforms() {
  plattformArr.forEach(plattformElement => {
    if (plattformElement.active == true) {
      if (plattformElement.y < plattformElement.maxY) plattformElement.y += 4;
    } else {
      if (plattformElement.y > plattformElement.minY) plattformElement.y -= 4;
    }
    plattformElement.draw();
  });
}

function plattformColliderCheck(plattformArr, characterArray) {
  for (let i = 0; i < characterArray.length; i++) {
    for (let j = 0; j < plattformArr.length; j++) {
      characterArray[i].colChecker(plattformArr[j]);
      plattformArr[j].colChecker(characterArray[i]);
    }
  }
}

function drawPresent() {
  currentCharacter.colChecker(ground);
  currentCharacter.fall();
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
    ground.draw(); // dibuja el piso
    drawPlattforms();
    plattformColliderCheck(plattformArr, characterInstanceArr);
    replay();
    drawPresent();
    console.log(
      "plat 0:" + plattformArr[0].active,
      "plat 1: " + plattformArr[1].active
    );
  }, 1000 / 60);
}

function generateCharacter(x, y) {
  character = new Character(x, y);
  characterInstanceArr.push(character);
}

function replay() {
  if (characterInstanceArr.length > 1) {
    for (let i = 0; i < characterInstanceArr.length - 1; i++) {
      characterInstanceArr[i].colChecker(ground);
      characterInstanceArr[i].fall();
      ctx.drawImage(
        characterInstanceArr[i].image,
        (characterInstanceArr[i].x += characterInstanceArr[i].xVelocity),
        (characterInstanceArr[i].y += characterInstanceArr[i].yVelocity),
        characterInstanceArr[i].width,
        characterInstanceArr[i].height
      );
      characterInstanceArr[i].xVelocity *= friction;
      characterInstanceArr[i].yVelocity *= yFriction;
      for (let j = 0; j < characterInstanceArr[i].instanceTimer.length; j++) {
        if (currentTime == characterInstanceArr[i].instanceTimer[j])
          // console.log("Time equal!!");
          switch (characterInstanceArr[i].instanceKeyPressed[j]) {
            case "Left":
              if (characterInstanceArr[i].x > 0)
                characterInstanceArr[i].moveLeft();
              break;
            case "Right":
              if (
                characterInstanceArr[i].x + characterInstanceArr[i].width <
                canvas.width
              )
                characterInstanceArr[i].moveRight();
              break;
            case "Up":
              if (characterInstanceArr[i].isJumping !== true) {
                characterInstanceArr[i].jump();
                characterInstanceArr[i].isGrounded = false;
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
