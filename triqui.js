let contadorX = 0;
let contadorO = 0;

function obtenerCuadros() {
  const cuadros = document.getElementsByClassName('cuadro')
  return cuadros
}
const cuadros = obtenerCuadros()

function obtenerJugadores() {
  const jugadores = document.getElementsByClassName('jugador')
  return jugadores
}
const jugadores = obtenerJugadores()

let arregloX = []
let arregloO = []


function clickSobreCuadros(cuadros) {
  arregloO = []
  arregloX = []
  actualizarContadores();
  alumbrar(jugadores, 0)
  for (let j = 0; j < cuadros.length; j++) {
    cuadros[j].addEventListener("click", poner)
    cuadros[j].innerHTML = ""
  }
}
clickSobreCuadros(cuadros)

function ponerX(cuadro) {
  cuadro.innerHTML = 'X'
}

function ponerO(cuadro) {
  cuadro.innerHTML = 'O'
}

let i = 0

function poner(ev) {
  if (i == 0) {
    ponerX(this)
    i = 1
    alumbrar(jugadores, i)
    apagar(jugadores, i-1)
    arregloX.push(this.classList[1])
  } else {
    ponerO(this)
    i = 0
    alumbrar(jugadores, i)
    apagar(jugadores, i + 1)
    arregloO.push(this.classList[1])
  }
  let resultado = ganador(arregloO, arregloX)
  if (resultado == 1) {
    contadorX++; // Incrementar contador de jugador X
    swal({
      title: "Ganó el jugador X",
    }).then((value) => {
        apagar(jugadores, 0)
        apagar(jugadores, 1)
        clickSobreCuadros(cuadros)
      actualizarContadores();
      fin();
    });
  } else if (resultado == 2) {
    contadorO++; // Incrementar contador de jugador O
    swal({
      title: "Ganó el jugador O",
    }).then((value) => {
      apagar(jugadores, 0)
      apagar(jugadores, 1)
      clickSobreCuadros(cuadros)
      actualizarContadores();
      fin();
    });
  } else if (resultado == 3) {
    swal({
      title: "Empate",
    }).then((value) => volverAEmpezar());
  } else if (resultado == 0) {
    this.removeEventListener("click", poner)
  }
}

function ganador(arregloO, arregloX) {
  //4 posibilidad
  //1.nadie ha ganado(0)
  //2.jugador 1 ganado(1) ya
  //3.jugador 2 ganad(2) ya
  //4.empate(3)
  let resultado = 0
  if(tresEnLinea(arregloO,"1","2","3")){resultado = 2}
  else if(tresEnLinea(arregloO,"4","5","6")){resultado = 2}
  else if(tresEnLinea(arregloO,"7","8","9")){resultado = 2}
  else if(tresEnLinea(arregloO,"1","4","7")){resultado = 2}
  else if(tresEnLinea(arregloO,"2","5","8")){resultado = 2}
  else if(tresEnLinea(arregloO,"3","6","9")){resultado = 2}
  else if(tresEnLinea(arregloO,"1","5","9")){resultado = 2}
  else if(tresEnLinea(arregloO,"3","5","7")){resultado = 2}

  else if(tresEnLinea(arregloX,"1","2","3")){resultado = 1}
  else if(tresEnLinea(arregloX,"4","5","6")){resultado = 1}
  else if(tresEnLinea(arregloX,"7","8","9")){resultado = 1}
  else if(tresEnLinea(arregloX,"1","4","7")){resultado = 1}
  else if(tresEnLinea(arregloX,"2","5","8")){resultado = 1}
  else if(tresEnLinea(arregloX,"3","6","9")){resultado = 1}
  else if(tresEnLinea(arregloX,"1","5","9")){resultado = 1}
  else if(tresEnLinea(arregloX,"3","5","7")){resultado = 1}

  else if(arregloO.length >=5 || arregloX.length >=5){return resultado = 3}
  return resultado
}

function tresEnLinea(arreglo, x, y, z) {
  if(arreglo.includes(x) && arreglo.includes(y) && arreglo.includes(z)){
    return true
  }else{return false}
}

function alumbrar(jugadores, i) {
  jugadores[i].classList.add("verde")
}

function apagar(jugadores, i) {
  jugadores[i].className = `jugador ${i}`
}


function volverAEmpezar() {
  swal({
    title: "¿Desea volver a jugar?",
    buttons: {
      No: {
        text: "No",
      },
      Si: {
        text: "Si",
      }
    }
  }).then((value) => {
    switch (value) {
      case "Si":
        apagar(jugadores, 0)
        apagar(jugadores, 1)
        clickSobreCuadros(cuadros)
        break;

      case "No":
        acabarJuego();
        break;
    }
  });
}

function acabarJuego() {
  for (let j = 0; j < cuadros.length; j++) {
    cuadros[j].removeEventListener("click", poner)
    cuadros[j].innerHTML = ""
  }
  apagar(jugadores, 0)
  apagar(jugadores, 1)
}

function actualizarContadores() {
  const contadorXElement = document.getElementById("contadorX");
  const contadorOElement = document.getElementById("contadorO");
  contadorXElement.textContent = contadorX;
  contadorOElement.textContent = contadorO;
}

function fin (){
  if(contadorO >=3){
    swal({
      title: "Jugador O ha ganado la partida",
      buttons: {
        OK: {
          text: "OK",
        }
      }
    }).then((value) => {
      switch (value) {
        case "OK":
          apagar(jugadores, 0)
          apagar(jugadores, 1)
          contadorO=0
          contadorX=0
          actualizarContadores();
          volverAEmpezar();
      }
    });
  }else if(contadorX>=3){
    swal({
      title: "Jugador X ha ganado la partida",
      buttons: {
        OK: {
          text: "OK",
        }
      }
    }).then((value) => {
      switch (value) {
        case "OK":
          apagar(jugadores, 0)
          apagar(jugadores, 1)
          contadorO=0
          contadorX=0
          actualizarContadores();
          volverAEmpezar();
      }
    });
  }
  
}