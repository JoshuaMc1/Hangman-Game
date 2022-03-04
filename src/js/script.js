//======================================================================
// VARIABLES
//======================================================================

var listaPalabras = [];
let palabraAdivinar = [];
let palabraMostrar = [];
var contadorGanador = 0;
var contadorPerdedor = 0;
var contadorPuntos=0;
let historialLetrasUsuario = [];
let arregloTabla = [];
let numIntentos = 0;
var estado = "";
var terminadas = 0;
var canceladas = 0;
var nombre = "";
var letraUsuario = "";
var captureLetra = "";
let nodoLetra = document.querySelector("#letra");
let nodoBoton = document.querySelector("#boton");
let nodoResultado = document.querySelector("#resultado");
let nodoIntentos = document.querySelector("#intentos");
let nodoPuntos = document.querySelector("#puntos");
let nodoHistorial = document.querySelector("#historial");
let agregar = document.querySelector("#agregar");
let abandonar = document.querySelector("#agregar");
let volverJugar = document.querySelector("#btnVolver");
let btnJugar = document.querySelector("#jugar");
let fila = document.querySelector("#grilla tbody");
const teclado = document.querySelector("#tecladoD");

//======================================================================
// FUNCIONES
//======================================================================

/**
 * Método que prepara el juego para iniciarse
 */
// Antes de ejecutar Javascript espera que toda la página se dibuje
cargarEventListenrs();
function cargarEventListenrs() {
  //======================================================================
  // EVENTOS
  //======================================================================
  // Al hacer clic en el boton se llama la funcion comprobarLetraUsuario
  //nodoBoton.addEventListener('click', comprobarLetraUsuario);
  // Al hacer Enter con el teclado se llama a la funcion comprobarLetraUsuario
  //nodoLetra.addEventListener('click', comprobarPulsadoEnter);
  agregar.addEventListener("click", agregarGrilla);
  abandonar.addEventListener("click", abandonarParti);
  teclado.addEventListener("click", tecladoDinamico);
  volverJugar.addEventListener("click", jugarNuevamente);
}

function tecladoDinamico(e) {
  if (e.target.classList.contains("teclado")) {
    var filaId = e.target.getAttribute("data-id");

    letraUsuario = filaId;
    comprobarLetraUsuario();
  }
}

//funciones
function agregarGrilla(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar")) {
    const datosSeleccionado = e.target.parentElement.parentElement;
    prepararJuego(datosSeleccionado);
  }
}

function jugarNuevamente(e){
    e.preventDefault();

    if (e.target.classList.contains("agregar")) {
      const datosSeleccionado = e.target.parentElement.parentElement;
      prepararJuego(datosSeleccionado);
    }
}

function abandonarParti(e) {
  e.preventDefault();

  if (e.target.classList.contains("abandonar")) {
    const datosSeleccionado = e.target.parentElement.parentElement;
    abandonarPartida(datosSeleccionado);
  }
}

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

  //tablaHTML();
}

function abandonarPartida(datos) {
  if (canceladas == 0) {
    canceladas = 1;
  }
  estado = "abandonar";
  verificarEstadoPartida(estado);
}

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

function prepararJuego(datos) {
  //// 1 Selecciono una palabra aleatoria de listaPalabra
  //// 1.1 Obtengo la posicion aleatoria

  nombre = document.getElementById("nombre").value;
  var temas = document.getElementById("temas").value;
  var dificultad = document.getElementById("dificultad").value;
 
  numIntentos = 4;

  validarCampos(nombre, temas, dificultad);
  validarEleccion(temas, dificultad);
}
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
    listaPalabras = ["mango", "fresas", "cereza", "nance"];
  }
  if (temas == "3" && dificultad == "1") {
    listaPalabras = ["blanco", "negro", "morado", "naranja"];
  }
  let posAleatoriaListaPalabras = _.random(listaPalabras.length - 1);
  //// 1.2 Obtengo la palabra aleatoria
  let palabraAleatoria = listaPalabras[posAleatoriaListaPalabras];
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
  // Mostramos el historial de letras
  nodoHistorial.textContent = historialLetrasUsuario.join(" ");
}

/**
 * Método que comprueba la letra que ha introducido el usuario
 */
function comprobarLetraUsuario() {
  //// 1 Sustituye los guiones por la letra acertada
  // Guardo la letra del input que ha escrito el usuario en una variable
  //let captureLetra=filaId;
  //let letraUsuario = captureLetra;
  // Vaciamos el input para que el usuario pueda volver a escribir
  //nodoLetra.value = '';
  // Le devolvemos el foco al input para que pueda introducir otra letra
  //nodoLetra.focus();
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
  if (!palabraAdivinar.includes(letraUsuario)) {
    // Restamos un intento
    numIntentos -= 1;
    // Guardamos en el historial la letra pulsada por el usuario

    historialLetrasUsuario.push(letraUsuario);
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
 * Método que comprueba si se ha pulsado la tecla Enter
 */
//function comprobarPulsadoEnter (evento) {
//    if (evento.code == 'Enter') {
//        comprobarLetraUsuario();
//    }
//}

/**
 * Método que verifica si se ha acabado el juego
 */
function acabarJuego() {
  // Ha ganado: ¿Le queda guiones al jugador?

  if (!palabraMostrar.includes("_")) {
    swal({
      title: `BIEN HECHO!!!`,
      text: `Has ganado!!!.
                    `,
      icon: "success",
    });
    // Refrescamos la página para volver a jugar
    //location.reload(true);
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
    

    //generarGrafico();

  }
  // Ha perdido: ¿Tiene 0 intentos?
  if (numIntentos == 0) {
    swal({
      title: `OH... HAS FALLADO!!!`,
      text: `Era ${palabraAdivinar.join("")}
                    `,
      icon: "success",
    });
    // Refrescamos la página para volver a jugar
    //location.reload(true);
    //reiniciar();
    if (contadorPerdedor == 0) {
      contadorPerdedor = 1;
    }
    if (terminadas == 0) {
      terminadas = 1;
    }

    estado = "perder";
    verificarEstadoPartida(estado);
    //generarGrafico();
  }
}

function reiniciar() {
  btnJugar.disabled = false;
  listaPalabras = [];
  palabraAdivinar = [];
  palabraMostrar = [];
  historialLetrasUsuario = [];
}
/*
function generarGrafico() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(grafico);

  function grafico() {
    var data = google.visualization.arrayToDataTable([
      ["Personas", "Registro de personas"],
      ["Ganadas", contadorGanador],
      ["Perdidas", contadorPerdedor],
    ]);

    let mensaje;
    if (contadorGanador == 0 && contadorPerdedor == 0) {
      mensaje = `There is no record in the department of `;
    } else {
      mensaje = `Registration of person in the department of `;
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
      document.getElementById("pieChart")
    );

    chart.draw(data, options);
  }
}*/

// Elimina las filas
/*
function vaciarHTML() {
  var elmtTable = document.getElementById("grilla");

  var tableRows = elmtTable.getElementsByTagName("tr");
  var rowCount = tableRows.length;

  for (var i = rowCount - 1; i > 0; i--) {
    elmtTable.removeChild(tableRows[i]);
  }
}*/
/*
function tablaHTML() {
  //limpiar html
  vaciarHTML();
  arregloTabla.forEach((dato) => {
    const {
      id,
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
                     <td>
                          <a href="#" class="verFila"  data-id="${id}">Ver</a>
                     </td>
                `;
    grilla.appendChild(row);
  });
}
*/