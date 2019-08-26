function getTimeAndKey(key, currentCharacter) {
  currentCharacter.instanceTimer.push(currentTime);
  currentCharacter.instanceKeyPressed.push(key);
}

//-----------------------------------------------
let keys = [];
let ground = new Ground(-5, 470 - 35);
let currentCharacter;
let characterCurrentInstance = 0;
generateCharacter(50, 470 - 35 - 125);
currentCharacter = characterInstanceArr[characterCurrentInstance];
let button = new BlueButton(600, 470 - 18 - 48);
let button_2 = new BlueButton(200, 470 - 18 - 48);
let buttonArr = [button, button_2];

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
    generateCharacter(50, 470 - 35 - 125);
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
