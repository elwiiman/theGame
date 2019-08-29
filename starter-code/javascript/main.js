//funcion para obtner el valor keycode del personaje "en el presente"
function getTimeAndKey(key, currentCharacter) {
  currentCharacter.instanceTimer.push(currentTime); // hace push en el arreglo de tiempos de la instancia del "presente"
  currentCharacter.instanceKeyPressed.push(key); // hace push en el arreglo de keycodes presionados, en la instancia del "presente"
}

//-----------------------------------------------
let keys = []; // arreglo de todas las teclas presionadas
let ground = new Ground(-5, 470 - 35); // nueva instancia para el piso
let currentCharacter; //declaracion de la variable que tendra al personaje del "presente"
let characterCurrentInstance = 0; // servira como indice para indicar cual es la instancia del "presente" en una arreglo de instancias de personajes
generateCharacter(50, 470 - 35 - 125); // ejecuta la funcion para generar un personaje en las coordenadas indicadas
currentCharacter = characterInstanceArr[characterCurrentInstance]; //indica cual es el personaje actual
let plattform_1 = new Plattform(200, 470 - 18 - 33);
let plattform_2 = new Plattform(600, 470 - 18 - 33);
let plattformArr = [plattform_1, plattform_2];

document.onkeydown = function(e) {
  keys[e.keyCode] = true;
  // tecla enter
  if (keys[13]) {
    startClick();
    console.log("empieza el tiempo");
  }
  if (keys[65]) {
    // tecla A
    getTimeAndKey("A", currentCharacter);
    stopClick(); //para el set interval
    resetClick(); // hace reset a la variable de tiempo "maestro"
    generateCharacter(50, 470 - 35 - 125); //genera una nueva instancia de personaje la cual sera ahora el del "presente"
    characterCurrentInstance += 1; // aumenta en uno el indice para indicar cual es la actual instancia (instancia del "presente")
    currentCharacter = characterInstanceArr[characterCurrentInstance]; //asignacion del personaje actual
    characterInstanceArr[characterCurrentInstance - 1].isInPast = true; //indica que la instancia anterior ahora es "del Pasado"
    characterInstanceArr[characterCurrentInstance - 1].pastImagesAssign(); // corre el metodo que asigna las imagendes del personaje para representar los personajes del "pasado"
    startClick(); //inicia nuevamente la secuencia de tiempo
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
