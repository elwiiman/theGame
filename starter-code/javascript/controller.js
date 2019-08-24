function controllerCheck() {
  if (!currentCharacter.isJumping && keys[38]) {
    // tecla up arrow
    getTimeAndKey("Up", currentCharacter);
    currentCharacter.jump();
  } else if (keys[40]) {
    // tecla down arrow
    getTimeAndKey("Down", currentCharacter);
  }

  if (keys[37] && !currentCharacter.isCollidedLeft) {
    // tecla left arrow
    getTimeAndKey("Left", currentCharacter);
    if (currentCharacter.x > 0) {
      // dont let move outside letf border of canvas
      currentCharacter.moveLeft();
      currentCharacter.isWalkingLeft = true;
      currentCharacter.isWalkingRight = false;
    }
  } else if (keys[39] && !currentCharacter.isCollidedRight) {
    // tecla right arrow
    getTimeAndKey("Right", currentCharacter);
    if (currentCharacter.x + currentCharacter.width < canvas.width) {
      // dont let move outside right border of canvas
      currentCharacter.moveRight();
      currentCharacter.isWalkingLeft = false;
      currentCharacter.isWalkingRight = true;
    }
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
