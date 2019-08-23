function getTimeAndKey(key, currentCharacter) {
  currentCharacter.instanceTimer.push(currentTime);
  currentCharacter.instanceKeyPressed.push(key);
}

let keys = [];
//-----------------------------------------------

// let isMasterTimerON = false;
// let chronometerInstanceArr = [];
let currentCharacter;
let characterCurrentInstance = 0;
generateCharacter(50, 250);
currentCharacter = characterInstanceArr[characterCurrentInstance];

document.onkeydown = function(e) {
  keys[e.keyCode] = true;
  // tecla enter
  if (keys[13]) {
    // tecla enter
    startClick();
    console.log("empieza el tiempo");
  } else if (keys[37]) {
    // tecla left arrow
    getTimeAndKey("Left", currentCharacter);
    e.preventDefault();
    currentCharacter.moveLeft();
  } else if (keys[39]) {
    // tecla right arrow
    getTimeAndKey("Right", currentCharacter);
    e.preventDefault();
    currentCharacter.moveRight();
  } else if (keys[38] && !currentCharacter.isJumping) {
    // tecla up arrow
    getTimeAndKey("Up", currentCharacter);
    e.preventDefault();
    currentCharacter.jump();
  } else if (keys[40]) {
    // tecla down arrow
    getTimeAndKey("Down", currentCharacter);
    e.preventDefault();
  } else if (!currentCharacter.isJumping && keys[39]) {
    getTimeAndKey("diagRight", currentCharacter);
    console.log("diagonal");
  } else if (keys[65]) {
    // tecla A
    stopClick();
    resetClick();
    generateCharacter(50, 250);
    characterCurrentInstance += 1;
    currentCharacter = characterInstanceArr[characterCurrentInstance];
    characterInstanceArr[characterCurrentInstance - 1].isInPast = true;
    characterInstanceArr[characterCurrentInstance - 1].pastImagesAssign();
    startClick();
  } else if (keys[83]) {
    // tecla s
    stopClick();
  }
};

document.onkeyup = function(e) {
  keys[e.keyCode] = false;
};
