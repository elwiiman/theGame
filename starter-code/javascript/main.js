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
let button = new BlueButton(300, 343);

document.onkeydown = function(e) {
  keys[e.keyCode] = true;
  // tecla enter
  if (keys[13]) {
    startClick();
    console.log("empieza el tiempo");
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

  if (keys[40]) {
    // tecla down arrow
    e.preventDefault();
  }
};

document.onkeyup = function(e) {
  keys[e.keyCode] = false;
};
