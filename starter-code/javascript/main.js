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
    // tecla enter
    startClick();
    console.log("empieza el tiempo");
  } else if (e.keyCode === 37) {
    // tecla left arrow
    getTimeAndKey("Left", currentCharacter);
    e.preventDefault();
    currentCharacter.moveLeft();
  } else if (e.keyCode === 39) {
    // tecla right arrow
    getTimeAndKey("Right", currentCharacter);
    e.preventDefault();
    currentCharacter.moveRight();
  } else if (e.keyCode === 38) {
    // tecla up arrow
    getTimeAndKey("Up", currentCharacter);
    e.preventDefault();
    currentCharacter.jump();
  } else if (e.keyCode === 40) {
    // tecla down arrow
    getTimeAndKey("Down", currentCharacter);
    e.preventDefault();
  } else if (e.keyCode === 65) {
    // tecla A
    stopClick();
    resetClick();
    generateCharacter(50, 250);
    characterCurrentInstance += 1;
    currentCharacter = characterInstanceArr[characterCurrentInstance];
    characterInstanceArr[characterCurrentInstance - 1].isInPast = true;
    characterInstanceArr[characterCurrentInstance - 1].pastImagesAssign();
    startClick();
  } else if (e.keyCode === 83) {
    // tecla s
    stopClick();
  }
};

// document.onkeydown = function(e) {
//   switch (e.keyCode) {
//     case 37: // tecla left arrow
//       break;
//     case 39: // tecla right arrow
//       break;
//   }
// };
