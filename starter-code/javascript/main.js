function getTimeAndKey(key) {
  chronometer.instanceTimer.push(chronometer.currentTime);
  chronometer.instanceKeyPressed.push(key);
}

//-----------------------------------------------

let isMasterTimerON = false;
let chronometerInstanceArr = [];
let chronometerCurrentInstance = 0;
let chronometer = new Chronometer(50, 50);

document.onkeydown = function(e) {
  // tecla enter
  if (e.keyCode === 13) {
    chronometer.startClick();
    isMasterTimerON = true;
    console.log("empieza el tiempo!");
  } else if (e.keyCode === 37) {
    // tecla left
    getTimeAndKey("Left");
    chronometer.x -= 7;
  } else if (e.keyCode === 39) {
    // tecla right
    getTimeAndKey("Right");
    chronometer.x += 7;
  } else if (e.keyCode === 38) {
    //tecla up
    getTimeAndKey("Up");
  } else if (e.keyCode === 40) {
    //tecla down
    getTimeAndKey("Down");
  } else if (e.keyCode === 32) {
    // tecla space
    chronometer.resetClick();
  } else if (e.keyCode === 83) {
    // tecla s
    chronometer.stopClick();
  }
};
