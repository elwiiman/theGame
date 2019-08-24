function getTimeAndKey(key, currentCharacter) {
  currentCharacter.instanceTimer.push(currentTime);
  currentCharacter.instanceKeyPressed.push(key);
}

//-----------------------------------------------
let keys = [];
let currentCharacter;
let characterCurrentInstance = 0;
generateCharacter(50, 250);
currentCharacter = characterInstanceArr[characterCurrentInstance];

document.onkeydown = function(e) {
  keys[e.keyCode] = true;
  // tecla enter
  if (keys[13]) {
    startClick();
    console.log("empieza el tiempo");
  }

  if (!currentCharacter.isJumping && keys[38]) {
    // tecla up arrow
    getTimeAndKey("Up", currentCharacter);
    e.preventDefault();
    currentCharacter.jump();
  } else if (keys[40]) {
    // tecla down arrow
    getTimeAndKey("Down", currentCharacter);
    e.preventDefault();
  }

  if (keys[37]) {
    // tecla left arrow
    getTimeAndKey("Left", currentCharacter);
    e.preventDefault();
    currentCharacter.moveLeft();
  } else if (keys[39]) {
    // tecla right arrow
    getTimeAndKey("Right", currentCharacter);
    e.preventDefault();
    currentCharacter.moveRight();
  }

  if (currentCharacter.isJumping && keys[39]) {
    getTimeAndKey("jumpRight", currentCharacter);
    currentCharacter.xVelocity += 25;
  } else if (currentCharacter.isJumping && keys[37]) {
    getTimeAndKey("jumpLeft", currentCharacter);
    currentCharacter.xVelocity -= 25;
  }

  if (keys[65]) {
    // tecla A
    stopClick();
    resetClick();
    generateCharacter(50, 250);
    characterCurrentInstance += 1;
    currentCharacter = characterInstanceArr[characterCurrentInstance];
    characterInstanceArr[characterCurrentInstance - 1].isInPast = true;
    characterInstanceArr[characterCurrentInstance - 1].pastImagesAssign();
    startClick();
  }
  if (keys[83]) {
    // tecla s
    stopClick();
  }
};

document.onkeyup = function(e) {
  keys[e.keyCode] = false;
};
