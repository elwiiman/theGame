const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let characterInstanceArr = []; // arreglo de instancias de personajes
let currentTime = 0; // tiempo "maestro" inicializado
let intervalId; // declaracion de un interval ID global
let friction = 0.55;
let yFriction = 0.49;
// let colDir;

//seccion para cargar imagenes
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
    this.instanceTimer = []; // arreglo que guarda los tiempos en los que las teclas de comando son oprimidas
    this.instanceKeyPressed = []; // arreglo que guarda qué teclas fueron oprimidas
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
    this.isInPast = false; // bandera para indicar si el personaje está en el pasado
    this.isJumping = false; // bandera para indicar si el personaje esta saltando
    this.isGrounded = false; // bandera para indicar si el personaje está en el piso
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.isCollidedRight = false;
    this.isCollidedLeft = false;
    this.isCollidedTop = false;
    this.isCollidedBottom = false;
    this.isCollidedWithPlattform = false;
  }

  colChecker(shapeB) {
    // metodo para verificar colisiones entre personaje y objetos del entorno en general
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

  colCheckerPlattforms(shapeB) {
    //metodo para verificar colisiones entre personaje y plataformas
    // get the vectors to check against
    let vX = this.x + this.width / 2 - (shapeB.x + shapeB.width / 2),
      vY = this.y + this.height / 2 - (shapeB.y + shapeB.height / 2),
      // add the half widths and half heights of the objects
      hWidths = this.width / 2 + shapeB.width / 2,
      hHeights = this.height / 2 + shapeB.height / 2;
    let colDir;
    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
      // figures out on which side we are colliding (top, bottom, left, or right)
      let oX = hWidths - Math.abs(vX),
        oY = hHeights - Math.abs(vY);
      if (oX >= oY) {
        if (vY > 0) {
          colDir = "t"; // colision en top
          this.y += oY;
          this.yVelocity *= -1;
        } else {
          colDir = "b"; // colisione en bottom
          this.y -= oY;
          this.isJumping = false;
          this.isGrounded = true;
          shapeB.isCollided = true;
        }
      } else {
        if (vX > 0) {
          colDir = "r"; // colisione en right
          this.x += oX;
          this.xVelocity = 0;
        } else {
          colDir = "l"; // colision en left
          this.x -= oX;
          this.xVelocity = 0;
        }
      }
    }
    if (colDir != "b") {
      shapeB.isCollided = false;
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
    // metodo que asigna imagenes con color degradado para distinguir entre pasado y presente
    this.imageFrontman.src = characterGrayImages.frontman;
    this.imageLeft.src = characterGrayImages.left;
    this.imageRight.src = characterGrayImages.right;
    this.imageWalkLeft.src = characterGrayImages.leftWalk;
    this.imageWalkRight.src = characterGrayImages.rightWalk;
    this.image = this.imageFrontman;
  }

  fall() {
    this.yVelocity += 9.8; // effect of gravity
  }
}

class Plattform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 85;
    this.height = 18;
    this.maxY = y;
    this.minY = y - 20;
    this.imagePlattformTop = new Image();
    this.imagePlattformTop.src = plattformImages.plattformTop;
    this.active = false;
    this.isCollided = false;
  }

  colChecker(shapeB) {
    //metodo para verificar colisiones en la parte superior de plataformas
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

    let condition = Math.abs(vX) < hWidths && Math.abs(vY) === hHeights; // condicion que se cumple si algo colisiona con la parte superior de plataforma
    console.log("condition: " + condition);
    if (condition) {
      this.isCollided = true;
    } else {
      this.isCollided = false;
    }
  }

  draw() {
    //metodo de dibujo de la clase de plataformas
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
      if (plattformElement.y < plattformElement.maxY) plattformElement.y += 4; //aumenta posicion en y hasta maxY
    } else {
      if (plattformElement.y > plattformElement.minY) plattformElement.y -= 4; //disminuye posicion en y hasta maxY
    }
    plattformElement.draw();
  });
}

function plattformColliderCheck(plattformArr, characterArray) {
  for (let i = 0; i < characterArray.length; i++) {
    for (let j = 0; j < plattformArr.length; j++) {
      let colDir = characterArray[i].colCheckerPlattforms(plattformArr[j]);
      console.log(colDir);
      if (colDir == "b") {
        plattformArr[j].active = true;
      } else {
        plattformArr[j].active = false;
      }
    }
  }
}

// plattformArr = plattformArr.map((platform) => {
//   if(col){
//     platform.active = true;
//     return platform
//   }
//   return plataforma
// })

function drawPresent() {
  currentCharacter.colChecker(ground); //verifica colison con el suelo
  currentCharacter.fall(); //aplica gravedad
  ctx.drawImage(
    // dibuja la imagen del current character (personaje del presente) o instancia más actual
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
    currentTime += 1; //aumenta en 1 el tiempo maestro
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    controllerCheck(); //ejecuta los comandos de movimiento de acuerdo a las teclas presionadas
    ground.draw(); // dibuja el piso
    plattformColliderCheck(plattformArr, characterInstanceArr); // revisa colisiones entre plataformas y personajes
    drawPlattforms(); // dibuja las plataformas
    replay(); // ejecuta la funcion para las replicas
    drawPresent(); // dibuja el "presente"
    console.log(
      "plat 0:" + plattformArr[0].active,
      "plat 1: " + plattformArr[1].active
    );
  }, 1000 / 35);
}

function generateCharacter(x, y) {
  character = new Character(x, y);
  characterInstanceArr.push(character);
}

function replay() {
  //funcion para dibujar a las replicas
  if (characterInstanceArr.length > 1) {
    //ejecuta hasta que haya mas de una instancia de personajes
    for (let i = 0; i < characterInstanceArr.length - 1; i++) {
      // para todas las instancias menos la del presente (menos la màs nueva)
      characterInstanceArr[i].colChecker(ground); // colisiones de las replicas con el piso
      characterInstanceArr[i].fall(); //aplica gravedad a las replicas
      ctx.drawImage(
        // dibuja a las replicas
        characterInstanceArr[i].image,
        (characterInstanceArr[i].x += characterInstanceArr[i].xVelocity),
        (characterInstanceArr[i].y += characterInstanceArr[i].yVelocity),
        characterInstanceArr[i].width,
        characterInstanceArr[i].height
      );
      characterInstanceArr[i].xVelocity *= friction;
      characterInstanceArr[i].yVelocity *= yFriction;
      for (let j = 0; j < characterInstanceArr[i].instanceTimer.length; j++) {
        //recorre los tiempos del arrelgo instanceTimer de cada instancia del pasado
        if (currentTime == characterInstanceArr[i].instanceTimer[j])
          // si un valor del tiempo "master" es igual a un tiempo de los almacenados en el arreglo instanceTimer
          // console.log("Time equal!!");
          switch (
            characterInstanceArr[i].instanceKeyPressed[j] //ejecuta los comandos de movimeinto
          ) {
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
