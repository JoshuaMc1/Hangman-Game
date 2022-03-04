//======================================================================
// VARIABLES
//======================================================================

//arreglos
var listaPalabras = [];
var palabraAdivinar = [];
var palabraMostrar = [];
var historialLetrasUsuario = [];
var arregloTabla = [];

//contadores
var contadorGanador = 0;
var contadorPerdedor = 0;
var contadorPuntos = 0;
var contaPerdedor = 0;
var contaGanador = 0;
var contaTerminada = 0;
var contaCancelada = 0;
var terminadas = 0;
var canceladas = 0;
//intentento que tendra el usaurio
let numIntentos = 0;
var seguirJugar = false;
//estado dependera de donde da clic el usario, si preciona abandonar el estado sera abandonar si gana sera ganar
var estado = "";

//variables
var nombre = "";
var nombreUsuario = "";
var nombreJugador = "";
var letraUsuario = "";
var palabraAleatoria = "";
let nodoLetra = document.querySelector("#letra");
let nodoBoton = document.querySelector("#boton");
let nodoResultado = document.querySelector("#resultado");
let nodoIntentos = document.querySelector("#intentos");
let nodoPista = document.querySelector("#pista");
let nodoPuntos = document.querySelector("#puntos");
let nodoHistorial = document.querySelector("#historial");
let agregar = document.querySelector("#agregar");
let abandonar = document.querySelector("#abandonar");
let volverJugar = document.querySelector("#btnVolver");
let btnAbandonar = document.querySelector("#abandonar");
let btnJugar = document.querySelector("#jugar");
var mostrarGra = document.querySelector("#grillaTabla");
let fila = document.querySelector("#grilla tbody");
const teclado = document.querySelector("#tecladoD");
var table = document.getElementsByTagName("table")[0];
var tbody = table.getElementsByTagName("tbody")[0];
var table = document.getElementsByTagName("table")[0];
var tbody = table.getElementsByTagName("tbody")[0];

//evento escucha clic
cargarEventListenrs();
function cargarEventListenrs() {
  agregar.addEventListener("click", agregarGrilla);
  abandonar.addEventListener("click", abandonarParti);
  teclado.addEventListener("click", tecladoDinamico);
  volverJugar.addEventListener("click", jugarNuevamente);
}

//funcion para dar clic a la tabla y muestre el grafico
function ver(e) {
  document.getElementById("datos").style.display = "block";
  e = e || window.event;
  var data = [];
  var target = e.srcElement || e.target;
  while (target && target.nodeName !== "TR") {
    target = target.parentNode;
  }
  if (target) {
    var cells = target.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
      data.push(cells[i].innerHTML);
    }
  }
  contaGanador = parseInt(data.slice(1, 2));
  nombreJugador = data.slice(0, 1);
  contaPerdedor = parseInt(data.slice(2, 3));
  contaTerminada = parseInt(data.slice(1, 2));
  contaCancelada = parseInt(data.slice(2, 3));
  graficos();
  graficos1();
}

//grafico de ganador y perdedor
function graficos() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(grafico);

  function grafico() {
    var data = google.visualization.arrayToDataTable([
      ["Personas", "Registro de jugador"],
      ["Ganador", contaGanador],
      ["Perdedor", contaPerdedor],
    ]);

    let mensaje;
    if (contaGanador == 0 && contaPerdedor == 0) {
      mensaje = `No hay registros`;
    } else {
      mensaje = `Registro de de las partidas de ${nombreJugador}`;
    }
    var options = {
      title: mensaje,
      pieHole: 0.4,
      slices: {
        0: { color: "red" },
        1: { color: "blue" },
      },
      backgroundColor: {
        fill: "none",
        fillOpacity: 0.1,
      },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("pieChart2")
    );

    chart.draw(data, options);
  }
}

//grafico de terminadas y canceladas
function graficos1() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(grafico);

  function grafico() {
    var data = google.visualization.arrayToDataTable([
      ["Partidas", "Registro de partidas", { role: "style" }],
      ["Terminada", contaTerminada, "color: #a9bfea"], // RGB value
      ["Cancelada", contaCancelada, "color: #dc3912"],
    ]);

    var options = {
      title: "Registro de partidas terminadas o canceladas",
    };

    var chart = new google.visualization.ColumnChart(
      document.getElementById("pieChart")
    );
    chart.draw(data, options);
  }
}

//funcion para saber que se le ha dado clic a un boton o letra, luego se cantura esa letra y compara
function tecladoDinamico(e) {
  if (e.target.classList.contains("teclado")) {
    var filaId = e.target.getAttribute("data-id");

    letraUsuario = filaId;
    comprobarLetraUsuario();
  }
}

//funciones agregar dato y comenzar a jugar
function agregarGrilla(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar")) {
    const datosSeleccionado = e.target.parentElement.parentElement;
    prepararJuego(datosSeleccionado);
  }
}

//volver a jugar
function jugarNuevamente(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar")) {
    const datosSeleccionado = e.target.parentElement.parentElement;
    prepararJuego(datosSeleccionado);
  }
}

function prepararJuego(datos) {
  //// 1 Selecciono una palabra aleatoria de listaPalabra
  //// 1.1 Obtengo la posicion aleatoria
  reiniciar();
  volverJugar.disabled = true;
  btnAbandonar.disabled = false;
  document.getElementById("datos").style.display = "none";
  seguirJugar=true;


  nombre = document.getElementById("nombre").value;
  var temas = document.getElementById("temas").value;
  var dificultad = document.getElementById("dificultad").value;

  numIntentos = 4;

  validarCampos(nombre, temas, dificultad);
  validarEleccion(temas, dificultad);
}

//validaciones y contadores
function verificarEstadoPartida(estado) {
  const infoDatos = {
    nombre: nombre,
    contadorGanador: contadorGanador,
    contadorPerdedor: contadorPerdedor,
    terminadas: terminadas,
    canceladas: canceladas,
  };

  if (arregloTabla.some((datos) => datos.nombre === infoDatos.nombre)) {
    const dato = arregloTabla.map((datos) => {
      if (datos.nombre === infoDatos.nombre) {
        if (estado == "abandonar") {
          datos.canceladas++;
        }
        if (estado == "ganar") {
          datos.contadorGanador++;
        }
        if (estado == "perder") {
          datos.contadorPerdedor++;
        }
        if (estado == "ganar") {
          datos.terminadas++;
        }
        if (estado == "perder") {
          datos.terminadas++;
        }
        return datos;
      } else {
        return datos;
      }
    });
    arregloTabla = [...dato];
  } else {
    arregloTabla = [...arregloTabla, infoDatos];
  }
  reiniciar();

  tablaHTML();
}

//preparar el juego

function validarCampos(nombre, temas, dificultad) {
  if (nombre === "") {
    mostrarError("Falta llenar el campo de nombre");
    document.querySelector("#nombre").focus();
    return;
  }
  if (temas === "") {
    mostrarError("Falta seleccionar un tema");
    document.querySelector("#temas").focus();
    return;
  }
  if (dificultad === "") {
    mostrarError("Falta seleccionar la dificultad");
    document.querySelector("#dificultad").focus();
    return;
  }
}
function validarEleccion(temas, dificultad) {
  if (temas == "1" && dificultad == "2") {
    listaPalabras = [
      "caballito de mar",
      "leon marino",
      "estrella de mar",
      "oso panda",
    ];
    console.log(listaPalabras[0]);
  }

  if (temas == "2" && dificultad == "2") {
    listaPalabras = [
      "ciruelapasa",
      "higoseco",
      "orejonesdealbaricoque",
      "orejonesdemelocoton",
    ];
  }
  if (temas == "3" && dificultad == "2") {
    listaPalabras = [
      "azulmarino",
      "verdeoliva",
      "amarillolima",
      "lavandafloral",
    ];
  }

  if (temas == "1" && dificultad == "1") {
    listaPalabras = ["caballo", "oveja", "cerdo", "chimpance"];
  }
  if (temas == "2" && dificultad == "1") {
    listaPalabras = ["mango", "fresa", "cereza", "nance"];
  }
  if (temas == "3" && dificultad == "1") {
    listaPalabras = ["blanco", "negro", "azul", "naranja"];
  }
  let posAleatoriaListaPalabras = _.random(listaPalabras.length - 1);
  //// 1.2 Obtengo la palabra aleatoria
  palabraAleatoria = listaPalabras[posAleatoriaListaPalabras];
  //// 1.3 Separo la palabra en letras y lo guardo

  palabraAdivinar = palabraAleatoria.split("");
  //// 2 Preparo el array que va a ver el usuario. Tendrá el mismo número de guiones que letras en palabraAdivinar
  for (let letra of palabraAdivinar) {
    palabraMostrar.push("_");
  }
  //// 3 Dibuja todo lo necesario
  
    dibujarJuego();

  
}

/**
 * Método que redibuja lo que ve el usuario con los cambios
 */
function dibujarJuego() {
  // Convertimos un array en un texto, separado por espacios, y lo mostramos en el div resultado
  nodoResultado.textContent = palabraMostrar.join(" ");
  // Mostramos los intentos
  nodoIntentos.textContent = numIntentos;

  seleccionarPista();

  // Mostramos el historial de letras
  nodoHistorial.textContent = historialLetrasUsuario.join(" ");
}

//abandonar partida
function abandonarParti(e) {
  e.preventDefault();
  if (e.target.classList.contains("abandonar")) {
    const datosSeleccionado = e.target.parentElement.parentElement;
    abandonarPartida(datosSeleccionado);
  }
}



//abandonar partida y aumentar contador
function abandonarPartida(datos) {
  if (canceladas == 0) {
    canceladas = 1;
  }
  estado = "abandonar";
  verificarEstadoPartida(estado);
}

//mostrar un mensaje si se deja el campo vacio
function mostrarError(error) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = error;
  mensajeError.classList.add("error");

  const contenido = document.querySelector("#mensaje");
  contenido.appendChild(mensajeError);

  setTimeout(() => {
    mensajeError.remove();
  }, 3000);
}



function seleccionarPista() {
  if (palabraAleatoria === "caballo")
    nodoPista.textContent =
      "Pista: animal que físicamente poseen un gran porte";
  if (palabraAleatoria === "oveja")
    nodoPista.textContent = "Pista: produce carne y lana";
  if (palabraAleatoria === "cerdo")
    nodoPista.textContent = "Pista: cuadrúpedo con patas cortas y pezuñas";
  if (palabraAleatoria === "chimpance")
    nodoPista.textContent = "Pista: pariente mas cercano de los humanos";
  if (palabraAleatoria === "blanco")
    nodoPista.textContent = "Pista: color de la nieve";
  if (palabraAleatoria === "naranja")
    nodoPista.textContent = "Pista: es color y fruta";
  if (palabraAleatoria === "azul")
    nodoPista.textContent = "Pista: color del cielo";
  if (palabraAleatoria === "mango")
    nodoPista.textContent =
      "Pista: maduro es dulce, y ácido cuando aún está verde";
  if (palabraAleatoria === "fresa")
    nodoPista.textContent = "Pista: generalmente a las personas presumidas";
  if (palabraAleatoria === "cereza")
    nodoPista.textContent =
      "Pista: Las palabras y las ------ unas con otras se ";
  if (palabraAleatoria === "nance")
    nodoPista.textContent = "Pista: un viejito con tres pelitos en el culito";
  if (palabraAleatoria === "caballitodemar")
    nodoPista.textContent = "Pista: posee un cuello como de caballo";
  if (palabraAleatoria === "leonmarino")
    nodoPista.textContent = "Pista: comparte muchas caracteristica con a foca";
  if (palabraAleatoria === "estrellademar")
    nodoPista.textContent = "Pista: posee cinco brazos";
  if (palabraAleatoria === "osopanda")
    nodoPista.textContent = "Pista: animal que practica el kung fu";
  if (palabraAleatoria === "ciruelapasa")
    nodoPista.textContent = "Pista: fruta desnutrida";
  if (palabraAleatoria === "higoseco")
    nodoPista.textContent = "Pista: resultado de la deshidratacion del higo";
  if (palabraAleatoria === "orejonesdealbaricoque")
    nodoPista.textContent = "Pista: son mitades de albaricoques";
  if (palabraAleatoria === "orejonesdemelocoton")
    nodoPista.textContent = "Pista: son mitades de melocoton";
  if (palabraAleatoria === "verdeoliva")
    nodoPista.textContent = "Pista: color y palmera";
  if (palabraAleatoria === "amarillolima")
    nodoPista.textContent = "Pista: color y fruta";
  if (palabraAleatoria === "lavandafloral")
    nodoPista.textContent = "Pista: color y flor";
}

/**
 * Método que comprueba la letra que ha introducido el usuario
 */
function comprobarLetraUsuario() {
  //// 1 Sustituye los guiones por la letra acertada
  // Guardo la letra del input que ha escrito el usuario en una variable
 
  // Recorremos todas las letras para saber si alguna esta bien
  for (const [posicion, letraAdivinar] of palabraAdivinar.entries()) {
    // Comprobamos si la letra del usuario es igual a la letra a adivinar

    if (letraUsuario == letraAdivinar) {
      // Sustituimos el guion por la letra acertada
      palabraMostrar[posicion] = letraAdivinar;
    }
  }
  //// 2 Comprobamos si se ha equivocado
  // ¿No esta la letra?
  if (!palabraAdivinar.includes(letraUsuario) &&seguirJugar==true ) {
    // Restamos un intento
    numIntentos -= 1;
    // Guardamos en el historial la letra pulsada por el usuario

    historialLetrasUsuario.push(letraUsuario);

    //cambiar la imagen segun los intentos
    if (numIntentos == 4) {
      document.querySelector("#imagen_ahorcado").src = "src/img/ahorcado1.png";
    }
    if (numIntentos == 3) {
      document.querySelector("#imagen_ahorcado").src = "src/img/ahorcado2.png";
    }
    if (numIntentos == 2) {
      document.querySelector("#imagen_ahorcado").src = "src/img/ahorcado3.png";
    }
    if (numIntentos == 1) {
      document.querySelector("#imagen_ahorcado").src = "src/img/ahorcado4.png";
    }
    if (numIntentos == 0) {
      document.querySelector("#imagen_ahorcado").src = "src/img/ahorcado5.png";
    }
  }
  //// 3 Comprobamos si hay que terminar el juego
  acabarJuego();
  //// 4 Mostramos los cambios
  dibujarJuego();
}


/**
 * Método que verifica si se ha acabado el juego
 */
function acabarJuego() {
  // Ha ganado: ¿Le queda guiones al jugador?

  if (!palabraMostrar.includes("_")) {
    if(seguirJugar==true) {
      swal({
        title: `BIEN HECHO!!!`,
        text: `Has ganado!!!.
                      `,
        icon: "success",
      });
  
      //crear objeto
      contadorPuntos++;
      nodoPuntos.textContent = contadorPuntos;
  
      reiniciar();
      if (contadorGanador == 0) {
        contadorGanador = 1;
      }
      if (terminadas == 0) {
        terminadas = 1;
      }
  
      estado = "ganar";
  
      verificarEstadoPartida(estado);
      
    }
    seguirJugar=false;
  
  }
  // Ha perdido: ¿Tiene 0 intentos?
  if (numIntentos == 0) {
    if(seguirJugar==true) {
      swal({
        title: `OH... HAS FALLADO!!!`,
        text: `Era ${palabraAdivinar.join("")}
                      `,
        icon: "success",
      });
     
      if (contadorPerdedor == 0) {
        contadorPerdedor = 1;
      }
      if (terminadas == 0) {
        terminadas = 1;
      }
  
      estado = "perder";
      verificarEstadoPartida(estado);
    }
    seguirJugar=false;
    
  }
  btnAbandonar.disabled = true;
}

function reiniciar() {
  volverJugar.disabled = false;
  listaPalabras = [];
  palabraAdivinar = [];
  palabraMostrar = [];
  historialLetrasUsuario = [];
  canceladas = 0;
  document.querySelector("#imagen_ahorcado").src = "src/img/ahorcado0.png";
}




// limpiar las filas de la tabla

function vaciarHTML() {
  var elmtTable = document.getElementById("grilla");

  var tableRows = elmtTable.getElementsByTagName("tr");
  var rowCount = tableRows.length;

  for (var i = rowCount - 1; i > 0; i--) {
    elmtTable.removeChild(tableRows[i]);
  }
}

function tablaHTML() {
  //limpiar html
  vaciarHTML();
  arregloTabla.forEach((dato) => {
    const {
      nombre,
      contadorGanador,
      contadorPerdedor,
      terminadas,
      canceladas,
    } = dato;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${nombre}</td>
      <td>${contadorGanador} </td>
      <td>${contadorPerdedor} </td>
      <td>${terminadas} </td>
      <td>${canceladas} </td>
      
    `;
    grilla.appendChild(row);
  });
}
