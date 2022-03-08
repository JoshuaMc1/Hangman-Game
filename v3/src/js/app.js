
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
var contaFallida = 0;
var contaAcertadas=0;
var contaNoAcertadas=0;
var conta1=0;
var conta2=0;
var terminadas = 0;
var canceladas = 0;
var letraAcierto=0;
var letraFallo=0;
//intentento que tendra el usaurio
var numIntentos = 0;
var seguirJugar = false;
//estado dependera de donde da clic el usario, si preciona abandonar el estado sera abandonar si gana sera ganar
var estado = "";
var estado1 ="";
var estado2 ="";
//variables
var nombre = "";
var letraUsuario = "";
var palabraAleatoria = "";
let teclado = document.querySelector("#teclado");
var nodoLetra = document.querySelector("#letra");
var nodoBoton = document.querySelector("#boton");
var nodoResultado = document.querySelector("#resultado");
var nodoIntentos = document.querySelector("#intentos");
var usuario = document.querySelector("#nombreUsuario");
var nodoPista = document.querySelector("#pista");
var nodoPuntos = document.querySelector("#puntos");
var nodoHistorial = document.querySelector("#historial");
var agregar = document.querySelector("#agregar");
var abandonar = document.querySelector("#abandonar");
var mostrarGra = document.querySelector("#grillaTabla");
var fila = document.querySelector("#grilla tbody");
var table = document.getElementsByTagName("table")[0];
var tbody = table.getElementsByTagName("tbody")[0];
var table = document.getElementsByTagName("table")[0];
var tbody = table.getElementsByTagName("tbody")[0];

//evento escucha clic
cargarEventListenrs();
function cargarEventListenrs() {
  document.addEventListener('DOMContentLoaded', cargar);
  agregar.addEventListener("click", agregarGrilla);
  abandonar.addEventListener("click", abandonarParti);
  teclado.addEventListener("click", tecladoDinamico);
  document.addEventListener('DOMContentLoaded', ()=>{
    arregloTabla= JSON.parse(localStorage.getItem('grillaTabla') ) || [];
    tablaHTML();
});
}

function cargar() {
  document.getElementById('jugar').disabled=false;
  document.getElementById('abandonar').disabled=true;
  document.getElementById('clasificacion').disabled=true;
  seguirJugar=false;
}


//funcion para dar clic a la tabla y muestre el grafico
function ver(e) {
  swal({
    title: "Graficos",
    text: "Desea ver el grafico?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      
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
      contaTerminada = parseInt(data.slice(3, 4));
      contaCancelada = parseInt(data.slice(4,5));
      letraAcierto = parseInt(data.slice(5,6));
      letraFallo = parseInt(data.slice(6));
      graficos();
      graficos1();
      graficos2();
        
      
    }
  });
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
      mensaje = `Partidas ganadas y perdidas por ${nombreJugador}`;
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
      ["Personas", "Registro de jugador"],
      ["Sin terminar", contaTerminada],
      ["Canceladas", contaCancelada],
    ]);

    let mensaje;
    if (contaTerminada == 0 && contaCancelada == 0) {
      mensaje = `No hay registros`;
    } else {
      mensaje = `Partidas terminadas y canceladas por ${nombreJugador}`;
    }
    var options = {
      title: mensaje,
      pieHole: 0.4,
      slices: {
        0: { color: "green" },
        1: { color: "yellow" },
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
}

//grafico de terminadas y canceladas
function graficos2() {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(grafico);

  function grafico() {
    var data = google.visualization.arrayToDataTable([
      ["Personas", "Registro de jugador"],
      ["Letras Acertadas", letraAcierto],
      ["Letras Fallidas", letraFallo],
    ]);

    let mensaje;
    if (letraAcierto == 0 && letraFallo == 0) {
      mensaje = `No hay registros`;
    } else {
      mensaje = `Letras acertadas y fallidas ${nombreJugador}`;
    }
    var options = {
      title: mensaje,
      pieHole: 0.4,
      slices: {
        0: { color: "orange" },
        1: { color: "pink" },
      },
      backgroundColor: {
        fill: "none",
        fillOpacity: 0.1,
      },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById("pieChart3")
    );

    chart.draw(data, options);
  }
}
//funcion para saber que se le ha dado clic a un boton o letra, luego se cantura esa letra y compara
function tecladoDinamico(e) {
  if (e.target.classList.contains("tecladoD")) {
    let filaId = e.target.getAttribute("data-id");

    letraUsuario = filaId;
 
    if(seguirJugar==true){
    comprobarLetraUsuario();

    }
  }
}

//funciones agregar dato y comenzar a jugar
function agregarGrilla(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar")) {
    const datosSeleccionado = e.target.parentElement.parentElement;
    seguirJugar=true;
    desactivarInput();

    prepararJuego(datosSeleccionado);

   
    
    
  }
}

function activar() {
  document.getElementById('nombre').disabled=false;
  document.getElementById('temas').disabled=false;
  document.getElementById('dificultad').disabled=false;
  // Ocultar Spinner y mostrar gif de enviado

}


function desactivarInput() {
  document.getElementById('nombre').disabled=true;
    document.getElementById('temas').disabled=true;
    document.getElementById('dificultad').disabled=true;
}



function activarBotones(){
  document.getElementById('jugar').disabled=true;
  document.getElementById('abandonar').disabled=false;
  document.getElementById('clasificacion').disabled=false;
}

function prepararJuego(datos) {
  //// 1 Selecciono una palabra aleatoria de listaPalabra
  //// 1.1 Obtengo la posicion aleatoria
  reiniciar();
  
  document.getElementById("datos").style.display = "none";
  
  // Spinner al presionar Enviar
  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'flex';
  const conversion = document.getElementById("nombre").value;
  nombre = conversion.charAt(0).toUpperCase() + conversion.slice(1);
 
  var temas = document.getElementById("temas").value;
  var dificultad = document.getElementById("dificultad").value;

  numIntentos = 5;
    
  if (nombre === "") {
    mostrarError("Falta llenar el campo de nombre");
    document.querySelector("#nombre").focus();
    activar();
    setTimeout( () => {
      spinner.style.display = 'none';
      setTimeout(() =>  {
           
      }, 100);
      }, 3000);

    return;
  }
  if (temas === "") {
    mostrarError("Falta seleccionar un tema");
    document.querySelector("#temas").focus();
    activar();
    setTimeout( () => {
      spinner.style.display = 'none';
      setTimeout(() =>  {
           
      }, 100);
  }, 3000);
  

    return;
  }
  if (dificultad === "") {
    mostrarError("Falta seleccionar la dificultad");
    document.querySelector("#dificultad").focus();
    activar();
    setTimeout( () => {
      spinner.style.display = 'none';
      setTimeout(() =>  {
           
      }, 100);
  }, 3000);
  
    return;
  }
 
  
  setTimeout( () => {
    spinner.style.display = 'none';
    setTimeout(() =>  {
document.getElementById("mostrar").style.display = "none";

         
    }, 400);
}, 3000);

document.getElementById("ocultar").style.display = "block";
  activarBotones();
  validarEleccion(temas, dificultad);
}

function comenzarPartida(envio) {
  
  const comenzar = document.createElement("p");
  comenzar.textContent = envio;
  comenzar.classList.add("comenzar");

  const contenido = document.querySelector("#loaders");
  contenido.appendChild(comenzar);

}

//validaciones y contadores
function verificarEstadoPartida(estado) {
  const infoDatos = {
    nombre: nombre,
    contadorGanador: contadorGanador,
    contadorPerdedor: contadorPerdedor,
    terminadas: terminadas,
    canceladas: canceladas,
    contaAcertadas: contaAcertadas,
    contaNoAcertadas: contaNoAcertadas,
  };

  if (arregloTabla.some((datos) => datos.nombre === infoDatos.nombre)) {
    const dato = arregloTabla.map((datos) => {
      if (datos.nombre === infoDatos.nombre) {
        if (estado == "abandonar") {
          datos.canceladas++;
        }
        if (estado == "ganar") {
          datos.contadorGanador++;
          datos.terminadas++;

        }
        if (estado == "perder") {
          datos.contadorPerdedor++;
          datos.terminadas++;

        }
        if (estado1 == "acierto") {
          datos.contaAcertadas=conta1;
        }
        if (estado2 == "fallo") {
          datos.contaNoAcertadas=conta2;
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
  
}

function sincronizarStorage() {
   localStorage.setItem('grillaTabla', JSON.stringify(arregloTabla));   
}

function validarEleccion(temas, dificultad) {
  if (temas == "Animales" && dificultad == "2") {
    listaPalabras = [
      "caballitodemar",
      "leonmarino",
      "estrellademar",
      "osopanda",
    ];
  }

  if (temas == "Frutas" && dificultad == "2") {
    listaPalabras = [
      "ciruelapasa",
      "higoseco",
      "orejonesdealbaricoque",
      "orejonesdemelocoton",
    ];
  }
  if (temas == "Colores" && dificultad == "2") {
    listaPalabras = [
      "azulmarino",
      "verdeoliva",
      "amarillolima",
      "lavandafloral",
    ];
  }

  if (temas == "Animales" && dificultad == "1") {
    listaPalabras = ["caballo", "oveja", "cerdo", "chimpance"];
  }
  if (temas == "Frutas" && dificultad == "1") {
    listaPalabras = ["mango", "fresa", "cereza", "nance"];
  }
  if (temas == "Colores" && dificultad == "1") {
    listaPalabras = ["blanco", "negro", "azul", "naranja"];
  }

  var i,posAleatoriaListaPalabras;

  for (i = listaPalabras.length; i; i--) {
    posAleatoriaListaPalabras = Math.floor(Math.random() * i);
    palabraAleatoria = listaPalabras[i - 1];
      listaPalabras[i - 1] = listaPalabras[posAleatoriaListaPalabras];
      listaPalabras[posAleatoriaListaPalabras] = palabraAleatoria;
     
  }

  //let posAleatoriaListaPalabras = _.random(listaPalabras.length - 1);
  //// 1.2 Obtengo la palabra aleatoria
  //palabraAleatoria = listaPalabras[posAleatoriaListaPalabras];
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
  usuario.textContent = nombre;


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
    activar();
  }
}



//abandonar partida y aumentar contador
function abandonarPartida(datos) {
  if (canceladas == 0) {
    canceladas = 1;
  }
  estado = "abandonar";
  verificarEstadoPartida(estado);
  location.reload(true);
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
  if (palabraAleatoria === "caballo" && contaFallida>=3)nodoPista.textContent = "Pista: animal que físicamente poseen un gran porte";
  if (palabraAleatoria === "oveja" && contaFallida>=3)nodoPista.textContent = "Pista: produce carne y lana";
  if (palabraAleatoria === "cerdo" && contaFallida>=3)nodoPista.textContent = "Pista: cuadrúpedo con patas cortas y pezuñas";
  if (palabraAleatoria === "chimpance" && contaFallida>=3)nodoPista.textContent = "Pista: pariente mas cercano de los humanos";
  if (palabraAleatoria === "blanco" && contaFallida>=3)nodoPista.textContent = "Pista: color de la nieve";
  if (palabraAleatoria === "naranja" && contaFallida>=3)nodoPista.textContent = "Pista: es color y fruta";
  if (palabraAleatoria === "azul" && contaFallida>=3)nodoPista.textContent = "Pista: color del cielo";
  if (palabraAleatoria === "negro" && contaFallida>=3)nodoPista.textContent = "Pista: es la ausencia de luz";
  if (palabraAleatoria === "mango" && contaFallida>=3)nodoPista.textContent = "Pista: maduro es dulce, y ácido cuando aún está verde";
  if (palabraAleatoria === "fresa" && contaFallida>=3) nodoPista.textContent = "Pista: generalmente a las personas presumidas";
  if (palabraAleatoria === "cereza" && contaFallida>=3)nodoPista.textContent ="Pista: Las palabras y las ------ unas con otras se ";
  if (palabraAleatoria === "nance" && contaFallida>=3)nodoPista.textContent = "Pista: un viejito con tres pelitos en el culito";
  if (palabraAleatoria === "caballitodemar" && contaFallida>=3)nodoPista.textContent = "Pista: posee un cuello como de caballo";
  if (palabraAleatoria === "leonmarino"  && contaFallida>=3)nodoPista.textContent = "Pista: comparte muchas caracteristica con a foca";
  if (palabraAleatoria === "estrellademar" && contaFallida>=3)nodoPista.textContent = "Pista: posee cinco brazos";
  if (palabraAleatoria === "osopanda" && contaFallida>=3)nodoPista.textContent = "Pista: animal que practica el kung fu";
  if (palabraAleatoria === "ciruelapasa" && contaFallida>=3)nodoPista.textContent = "Pista: fruta desnutrida";
  if (palabraAleatoria === "higoseco" && contaFallida>=3)nodoPista.textContent = "Pista: resultado de la deshidratacion del higo";
  if (palabraAleatoria === "orejonesdealbaricoque" && contaFallida>=3)nodoPista.textContent = "Pista: son mitades de albaricoques";
  if (palabraAleatoria === "orejonesdemelocoton" && contaFallida>=3)nodoPista.textContent = "Pista: son mitades de melocoton";
  if (palabraAleatoria === "verdeoliva" && contaFallida>=3) nodoPista.textContent = "Pista: color y palmera";
  if (palabraAleatoria === "amarillolima" && contaFallida>=3)nodoPista.textContent = "Pista: color y fruta";
  if (palabraAleatoria === "lavandafloral" && contaFallida>=3)nodoPista.textContent = "Pista: color y flor";
  if (palabraAleatoria === "azulmarino" && contaFallida>=3)nodoPista.textContent = "Pista: color y referente al mar";
  
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
      conta1++;

      if (contaAcertadas == 0) {
        contaAcertadas = conta1;
      }
      estado1="acierto";

      
    }
  
  }
  //// 2 Comprobamos si se ha equivocado
  // ¿No esta la letra?
  if (!palabraAdivinar.includes(letraUsuario) &&seguirJugar==true ) {
    // Restamos un intento
    numIntentos -= 1;
    // Guardamos en el historial la letra pulsada por el usuario
    contaFallida++;
    conta2++;

    if (contaNoAcertadas == 0) {
      contaNoAcertadas = conta2;
    }
    estado2="fallo"

    historialLetrasUsuario.push(letraUsuario);
    console.log();

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

function adivinoPalabra() {
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
  seguirJugar=true;
  contaFallida=0;
  nodoPista.textContent='Aun no hay pistas disponibles...';
  prepararJuego(datos);
}
function noAdivino(){
  swal({
    title: `OH... HAS FALLADO!!!`,
    text: `Era ${palabraAdivinar.join("")}
                  `,
    icon: "error",
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
/**
 * Método que verifica si se ha acabado el juego
 */
function acabarJuego() {
  // Ha ganado: ¿Le queda guiones al jugador?

  if (!palabraMostrar.includes("_")) {
    if(seguirJugar==true) {
      adivinoPalabra();
      
      //location.reload(true);
      seguirJugar=true;
      setTimeout(() => {
      prepararJuego(datos);
        
        document.querySelector("#imagen_ahorcado").src = "src/img/ahorcado0.png";
  
      }, 1000);
    }
  
  
  }
  // Ha perdido: ¿Tiene 0 intentos?
  if (numIntentos == 0) {
    if(seguirJugar==true) {
      noAdivino();
      seguirJugar=true;
      setTimeout(() => {
        contaFallida=0;
        nodoPista.textContent='Aun no hay pistas disponibles...';
    
        prepararJuego(datos);
        document.querySelector("#imagen_ahorcado").src = "src/img/ahorcado0.png";
  
      }, 3000);
    }
   
  //location.reload(true);
    
  }
}

function reiniciar() {
  //volverJugar.disabled = false;
  //btnJugar.disabled = false;
  //btnAbandonar.disabled = true;


  listaPalabras = [];
  palabraAdivinar = [];
  palabraMostrar = [];
  historialLetrasUsuario = [];
  canceladas = 0;
}




// limpiar las filas de la tabla

function vaciarHTML() {
  var elmtTable = document.getElementById("grilla");

  var tableRows = elmtTable.getElementsByTagName("tr");
  var rowCount = tableRows.length;

  for (var i = rowCount - 1; i > 0; i--) {
    elmtTable.removeChild(tableRows[i]);
  }
  sincronizarStorage();
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
      contaAcertadas,
      contaNoAcertadas
    } = dato;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${nombre}</td>
      <td>${contadorGanador} </td>
      <td>${contadorPerdedor} </td>
      <td>${terminadas} </td>
      <td>${canceladas} </td>
      <td>${contaAcertadas} </td>
      <td>${contaNoAcertadas} </td>
      
    `;
    grilla.appendChild(row);
  });
}
