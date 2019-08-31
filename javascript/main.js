//funcion para obtner el valor keycode del personaje "en el presente"
function getTimeAndKey(key, currentCharacter) {
  currentCharacter.instanceTimer.push(currentTime); // hace push en el arreglo de tiempos de la instancia del "presente"
  currentCharacter.instanceKeyPressed.push(key); // hace push en el arreglo de keycodes presionados, en la instancia del "presente"
}

function rutineForSetCharacterCopies() {
  //rutina que será llamada siempre que existan las condiciones para crear una copia
  getTimeAndKey("A", currentCharacter);
  stopClick(); //para el set interval
  resetClick(); // hace reset a la variable de tiempo "maestro"
  generateCharacter(75, 470 - 35 - 125); //genera una nueva instancia de personaje la cual sera ahora el del "presente"
  characterCurrentInstance += 1; // aumenta en uno el indice para indicar cual es la actual instancia (instancia del "presente")
  currentCharacter = characterInstanceArr[characterCurrentInstance]; //asignacion del personaje actual
  characterInstanceArr[characterCurrentInstance - 1].isInPast = true; //indica que la instancia anterior ahora es "del Pasado"
  characterInstanceArr[characterCurrentInstance - 1].pastImagesAssign(); // corre el metodo que asigna las imagendes del personaje para representar los personajes del "pasado"
  for (i = 0; i <= characterInstanceArr.length - 2; i++) {
    characterInstanceArr[i].hasReturned = false;
  }
  startClick(); //inicia nuevamente la secuencia de tiempo
}

//-----------------------------------------------
let keys = []; // arreglo de todas las teclas presionadas

let currentCharacter; //declaracion de la variable que tendra al personaje del "presente"
let characterCurrentInstance = 0; // servira como indice para indicar cual es la instancia del "presente" en una arreglo de instancias de personajes
generateCharacter(75, 470 - 35 - 125); // ejecuta la funcion para generar un personaje en las coordenadas indicadas
currentCharacter = characterInstanceArr[characterCurrentInstance]; //indica cual es el personaje actual
let ground = new Ground(-5, 470 - 35); // nueva instancia para el piso
let door = new Door(50, 470 - 35 - 130);
let plattform_1 = new Plattform(250, 470 - 18 - 50);
let plattform_2 = new Plattform(610, 470 - 18 - 50);
let obstacleDoor_1 = new ObstacleDoor(450, -25, 450);
let obstacleDoor_2 = new ObstacleDoor(800, -25, 450);
let diamond = new Diamond(870, 200);

let plattformArr = [plattform_1, plattform_2];
let obstacleDoorArr = [obstacleDoor_1, obstacleDoor_2];

document.onkeydown = function(e) {
  keys[e.keyCode] = true;

  if (keys[13]) {
    // tecla enter
    startClick();
    console.log("empieza el tiempo");
  }
  if (keys[65]) {
    // tecla A
    if (door.active && characterCurrentInstance == 0) {
      rutineForSetCharacterCopies();
    } else {
      if (
        door.active &&
        characterInstanceArr[characterCurrentInstance - 1].hasReturned == true
      ) {
        rutineForSetCharacterCopies();
      }
    }
  }

  if (keys[83]) {
    // tecla s
    stopClick();
  }

  if (keys[40] || keys[37] || keys[39]) {
    // tecla down arrow
    e.preventDefault();
  }
};

document.onkeyup = function(e) {
  keys[e.keyCode] = false;
};
