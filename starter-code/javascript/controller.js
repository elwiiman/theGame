function controllerCheck() {
  if (!currentCharacter.isJumping && keys[38]) {
    // tecla up arrow
    getTimeAndKey("Up", currentCharacter);
    currentCharacter.jump();
  } else if (keys[40]) {
    // tecla down arrow
    getTimeAndKey("Down", currentCharacter);
  }

  if (keys[37]) {
    // tecla left arrow
    getTimeAndKey("Left", currentCharacter);
    currentCharacter.moveLeft();
  } else if (keys[39]) {
    // tecla right arrow
    getTimeAndKey("Right", currentCharacter);
    currentCharacter.moveRight();
  }

  if (currentCharacter.isJumping && keys[39]) {
    // if its jumping and right
    getTimeAndKey("jumpRight", currentCharacter);
    currentCharacter.animationJumpRight();
  } else if (currentCharacter.isJumping && keys[37]) {
    // if its jumping and left
    getTimeAndKey("jumpLeft", currentCharacter);
    currentCharacter.animationJumpLeft();
  }
}
