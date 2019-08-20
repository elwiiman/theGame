const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Chronometer {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 120;
    this.currentTime = 0;
    this.intervalId;
    this.instanceTimer = [];
    this.instanceKeyPressed = [];
    this.masterTimer = [0];
    this.posTrackerXaxis = [];
    this.posTrackerYaxis = [];
    this.image = new Image();
    this.image.src = "https://bit.ly/2L7yH3f";
  }

  startClick() {
    this.intervalId = setInterval(() => {
      this.currentTime += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.masterTimer.push(this.currentTime);
      this.posTrackerXaxis.push(this.x);
      this.posTrackerYaxis.push(this.y);
      this.draw();
    }, 1000 / 1000);
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  // getMinutes() {
  //   let minutes = 0;
  //   minutes = Math.floor(this.currentTime / 60);
  //   return minutes;
  // }
  // getSeconds() {
  //   let seconds = 0;
  //   seconds = this.currentTime % 60;
  //   return seconds;
  // }

  // twoDigitsNumber(number) {
  //   if (number.toString().length < 2) {
  //     number = number.toString();
  //     let finalNumber = "0" + number;
  //     return finalNumber;
  //   } else {
  //     return number.toString();
  //   }
  // }

  stopClick() {
    clearInterval(this.intervalId);
  }

  resetClick() {
    this.currentTime = 0;
  }

  splitClick() {
    return this.currentTime;
  }
}
