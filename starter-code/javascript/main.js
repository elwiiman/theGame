function getTimeAndKey(key, currentCharacter) {
  currentCharacter.instanceTimer.push(currentTime);
  currentCharacter.instanceKeyPressed.push(key);
}

//-----------------------------------------------

// let isMasterTimerON = false;
// let chronometerInstanceArr = [];
let currentCharacter;
let characterCurrentInstance = 0;
generateCharacter(50, 250);
currentCharacter = characterInstanceArr[characterCurrentInstance];

document.onkeydown = function(e) {
  // tecla enter
  if (e.keyCode === 13) {
    startClick();
    // isMasterTimerON = true;
    console.log("empieza el tiempo!");
  } else if (e.keyCode === 37) {
    // tecla left
    getTimeAndKey("Left", currentCharacter);
    currentCharacter.moveLeft();
  } else if (e.keyCode === 39) {
    // tecla right
    getTimeAndKey("Right", currentCharacter);
    currentCharacter.moveRight();
  } else if (e.keyCode === 38) {
    //tecla up
    getTimeAndKey("Up", currentCharacter);
    currentCharacter.jump();
  } else if (e.keyCode === 40) {
    //tecla down
    getTimeAndKey("Down", currentCharacter);
  } else if (e.keyCode === 65) {
    // tecla "A"
    stopClick();
    resetClick();
    generateCharacter(50, 250);
    characterCurrentInstance += 1;
    currentCharacter = characterInstanceArr[characterCurrentInstance];
    startClick();
  } else if (e.keyCode === 83) {
    // tecla s
    stopClick();
  }
};
