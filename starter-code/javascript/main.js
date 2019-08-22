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
  switch (e.keyCode) {
    case 13: // tecla enter
      startClick();
      console.log("empieza el tiempo");
      break;
    case 37: // tecla left arrow
      getTimeAndKey("Left", currentCharacter);
      currentCharacter.moveLeft();
      break;
    case 39: // tecla right arrow
      getTimeAndKey("Right", currentCharacter);
      currentCharacter.moveRight();
      break;
    case 38: // tecla up arrow
      getTimeAndKey("Up", currentCharacter);
      currentCharacter.jump();
      break;
    case 40: // tecla down arrow
      getTimeAndKey("Down", currentCharacter);
      break;
    case 65: // tecla A
      stopClick();
      resetClick();
      generateCharacter(50, 250);
      characterCurrentInstance += 1;
      currentCharacter = characterInstanceArr[characterCurrentInstance];
      characterInstanceArr[characterCurrentInstance - 1].isInPast = true;
      characterInstanceArr[characterCurrentInstance - 1].pastImagesAssign();
      startClick();
      break;
    case 83: // tecla s
      stopClick();
      break;
    default:
  }

  // document.onkeydown = function(e) {
  //   switch (e.keyCode) {
  //     case 37: // tecla left arrow
  //       break;
  //     case 39: // tecla right arrow
  //       break;
  //   }
  // };
};
