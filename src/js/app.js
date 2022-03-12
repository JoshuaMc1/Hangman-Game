//arreglos
let listaPalabras = [];
let arregloTabla = [];
let fallos = 0, aciertos = 0;
let contadorPuntos = 0;
let numIntentos = 0;
let estado = "";
let estadoAciertos = "";
let estadoFallos = "";
let conAcietos = 0;
let conFallos = 0;
let nombre = "";
let temas = "";
let letraUsuario = "";
let palabraAleatoria = ""
const agregar = document.querySelector("#agregar");
const abandonar = document.querySelector("#abandonar");
let tecladito = document.getElementById("teclado");
//evento escucha clic
cargarEventListenrs();
function cargarEventListenrs() {
  agregar.addEventListener("click", agregarGrilla);
  abandonar.addEventListener("click", abandonarParti);
  tecladito.addEventListener("click", tecladoDinamico);
  document.addEventListener("DOMContentLoaded", () => {
    arregloTabla = JSON.parse(localStorage.getItem("grillaTabla")) || [];
    tablaHTML();
  });
}
//funcion para dar clic a la tabla y muestre el grafico
function ver(e) {
  e.preventDefault();
  let table = document.getElementsByTagName("table")[0];
  let tbody = table.getElementsByTagName("tbody")[0];
  let contaGanador = 0;
  let contaPerdedor = 0;
  let contaTerminada = 0;
  let contaCancelada = 0;
  let letraAcierto = 0;
  let letraFallo = 0;
  let nombreJugador = "";

  swal({
    title: "Graficos",
    text: "Desea ver el grafico?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      document.getElementById("datos").style.display = "block";
      e = e || window.event;
      let data = [];
      let target = e.srcElement || e.target;
      while (target && target.nodeName !== "TR") {
        target = target.parentNode;
      }
      if (target) {
        let cells = target.getElementsByTagName("td");
        for (let i = 0; i < cells.length; i++) {
          data.push(cells[i].innerHTML);
        }
      }

      contaGanador = parseInt(data.slice(1, 2));
      nombreJugador = data.slice(0, 1);
      contaPerdedor = parseInt(data.slice(2, 3));
      contaTerminada = parseInt(data.slice(3, 4));
      contaCancelada = parseInt(data.slice(4, 5));
      letraAcierto = parseInt(data.slice(5, 6));
      letraFallo = parseInt(data.slice(6));
      graficos(contaGanador, contaPerdedor, nombreJugador);
      graficos1(contaTerminada, contaCancelada, nombreJugador);
      graficos2(letraAcierto, letraFallo, nombreJugador);
    }
  });
}
//grafico de ganador y perdedor
function graficos(contaGanador, contaPerdedor, nombreJugador) {
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
    let options = {
      title: mensaje,

      slices: {
        0: { color: "red" },
        1: { color: "blue" },
      },
      backgroundColor: {
        fill: "none",
        fillOpacity: 0.1,
      },
    };

    let chart = new google.visualization.PieChart(
      document.getElementById("pieChart")
    );

    chart.draw(data, options);
  }
}
//grafico de terminadas y canceladas
function graficos1(contaTerminada, contaCancelada, nombreJugador) {
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(grafico);

  function grafico() {
    var data = google.visualization.arrayToDataTable([
      ["Personas", "Registro de jugador"],
      ["Terminadas", contaTerminada],
      ["Sin terminar", contaCancelada],
    ]);

    let mensaje;
    if (contaTerminada == 0 && contaCancelada == 0) {
      mensaje = `No hay registros`;
    } else {
      mensaje = `Partidas terminadas y canceladas por ${nombreJugador}`;
    }
    let options = {
      title: mensaje,

      slices: {
        0: { color: "green" },
        1: { color: "purple" },
      },
      backgroundColor: {
        fill: "none",
        fillOpacity: 0.1,
      },
    };

    let chart = new google.visualization.PieChart(
      document.getElementById("pieChart1")
    );

    chart.draw(data, options);
  }
}
function graficos2(letraAcierto, letraFallo, nombreJugador) {
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
    let options = {
      title: mensaje,

      slices: {
        0: { color: "orange" },
        1: { color: "navy" },
      },
      backgroundColor: {
        fill: "none",
        fillOpacity: 0.1,
      },
    };

    let chart = new google.visualization.PieChart(
      document.getElementById("pieChart2")
    );

    chart.draw(data, options);
  }
}
//funcion para saber que se le ha dado clic a un boton o letra, luego se cantura esa letra y compara
function tecladoDinamico(e) {
  if (e.target.classList.contains("tecladoD")) {
    let filaId = e.target.getAttribute("data-id");
    letraUsuario = filaId;
    probarLetra();
    ocultarLetra();
  }
}
//funcion para desactivar la tecla presionada
function ocultarLetra() {
  if (letraUsuario === "q") document.getElementById("q").disabled = true;
  if (letraUsuario === "w") document.getElementById("w").disabled = true;
  if (letraUsuario === "e") document.getElementById("e").disabled = true;
  if (letraUsuario === "r") document.getElementById("r").disabled = true;
  if (letraUsuario === "t") document.getElementById("t").disabled = true;
  if (letraUsuario === "y") document.getElementById("y").disabled = true;
  if (letraUsuario === "u") document.getElementById("u").disabled = true;
  if (letraUsuario === "i") document.getElementById("i").disabled = true;
  if (letraUsuario === "o") document.getElementById("o").disabled = true;
  if (letraUsuario === "p") document.getElementById("p").disabled = true;
  if (letraUsuario === "a") document.getElementById("a").disabled = true;
  if (letraUsuario === "s") document.getElementById("s").disabled = true;
  if (letraUsuario === "d") document.getElementById("d").disabled = true;
  if (letraUsuario === "f") document.getElementById("f").disabled = true;
  if (letraUsuario === "g") document.getElementById("g").disabled = true;
  if (letraUsuario === "h") document.getElementById("h").disabled = true;
  if (letraUsuario === "j") document.getElementById("j").disabled = true;
  if (letraUsuario === "k") document.getElementById("k").disabled = true;
  if (letraUsuario === "l") document.getElementById("l").disabled = true;
  if (letraUsuario === "z") document.getElementById("z").disabled = true;
  if (letraUsuario === "x") document.getElementById("x").disabled = true;
  if (letraUsuario === "c") document.getElementById("c").disabled = true;
  if (letraUsuario === "v") document.getElementById("v").disabled = true;
  if (letraUsuario === "b") document.getElementById("b").disabled = true;
  if (letraUsuario === "n") document.getElementById("n").disabled = true;
  if (letraUsuario === "m") document.getElementById("m").disabled = true;
}
//funcion para reiniciar las letras desactivadas
function mostrarLetra() {
  document.getElementById("q").disabled = false;
  document.getElementById("w").disabled = false;
  document.getElementById("e").disabled = false;
  document.getElementById("r").disabled = false;
  document.getElementById("t").disabled = false;
  document.getElementById("y").disabled = false;
  document.getElementById("u").disabled = false;
  document.getElementById("i").disabled = false;
  document.getElementById("o").disabled = false;
  document.getElementById("p").disabled = false;
  document.getElementById("a").disabled = false;
  document.getElementById("s").disabled = false;
  document.getElementById("d").disabled = false;
  document.getElementById("f").disabled = false;
  document.getElementById("g").disabled = false;
  document.getElementById("h").disabled = false;
  document.getElementById("j").disabled = false;
  document.getElementById("k").disabled = false;
  document.getElementById("l").disabled = false;
  document.getElementById("z").disabled = false;
  document.getElementById("x").disabled = false;
  document.getElementById("c").disabled = false;
  document.getElementById("v").disabled = false;
  document.getElementById("b").disabled = false;
  document.getElementById("n").disabled = false;
  document.getElementById("m").disabled = false;
}
//funciones agregar dato y comenzar a jugar
function agregarGrilla(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar")) {
    const datosSeleccionado = e.target.parentElement.parentElement;
    prepararJuego(datosSeleccionado);
  }
}
//ocultar el spiner
function spinners() {
  setTimeout(() => {
    spinner.style.display = "none";
    setTimeout(() => { }, 400);
  }, 3000);
}
//comenzar a jugar
function prepararJuego(datos) {
  //// 1 Selecciono una palabra aleatoria de listaPalabra
  //// 1.1 Obtengo la posicion aleatoria
  mostrarLetra();
  reiniciar();
  document.getElementById("datos").style.display = "none";
  numIntentos = 5;
  $("#intentos").html(numIntentos);
  // Spinner al presionar Enviar
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";
  const conversion = document.getElementById("nombre").value;
  nombre = conversion.charAt(0).toUpperCase() + conversion.slice(1);
  temas = document.getElementById("temas").value;
  var dificultad = document.getElementById("dificultad").value;

  if (nombre === "") {
    mostrarError("Falta llenar el campo de nombre");
    document.querySelector("#nombre").focus();
    spinners();
    return;
  }
  if (temas === "") {
    mostrarError("Falta seleccionar un tema");
    document.querySelector("#temas").focus();
    spinners();
    return;
  }
  if (dificultad === "") {
    mostrarError("Falta seleccionar la dificultad");
    document.querySelector("#dificultad").focus();
    spinners();
    return;
  }
  setTimeout(() => {
    spinner.style.display = "none";
    setTimeout(() => {
      document.getElementById("mostrar").style.display = "none";
    }, 400);
  }, 3000);
  document.getElementById("ocultar").style.display = "block";
  validarEleccion(temas, dificultad);
}
// validar el tema y nivel de jugada
function validarEleccion(temas, dificultad) {
  if (temas == "Animales" && dificultad == "2")
    listaPalabras = [
      "caballito de mar",
      "leon marino",
      "estrella de mar",
      "oso panda",
    ];
  if (temas == "Frutas" && dificultad == "2")
    listaPalabras = [
      "ciruela pasa",
      "higo seco",
      "orejones de albaricoque",
      "orejones de melocoton",
    ];
  if (temas == "Colores" && dificultad == "2")
    listaPalabras = [
      "azul marino",
      "verde oliva",
      "amarillo lima",
      "lavanda floral",
    ];
  if (temas == "Animales" && dificultad == "1")
    listaPalabras = [
      "caballo",
      "oveja",
      "cerdo",
      "chimpance",
      "leon",
      "iguana",
      "elefante",
      "ardilla",
      "zorro",
      "cocodrilo",
    ];
  if (temas == "Frutas" && dificultad == "1")
    listaPalabras = [
      "mango",
      "fresa",
      "cereza",
      "nance",
      "papaya",
      "kiwi",
      "banano",
      "manzana",
      "caqui",
      "uva",
      "coco",
      "maracuya",
    ];
  if (temas == "Colores" && dificultad == "1")
    listaPalabras = [
      "blanco",
      "negro",
      "azul",
      "naranja",
      "marron",
      "rosa",
      "turqueza",
      "cian",
      "rojo",
      "zafiro",
    ];
  if (temas == "Base de datos" && dificultad == "1")
    listaPalabras = [
      "mysql",
      "orientdb",
      "couchdb",
      "mariadb",
      "mongodb",
      "postgresql",
      "firebird",
    ];
  if (temas == "Base de datos" && dificultad == "2")
    listaPalabras = [
      "oracle database",
      "inter systems cache",
      "microsoft access",
      "microsoft sql server",
    ];
  if (temas == "Frontend" && dificultad == "1")
    listaPalabras = ["html", "css", "react", "vue", "elm"];
  if (temas == "Frontend" && dificultad == "2")
    listaPalabras = ["javascript", "typescript", "jquery", "angular", "sass"];
  if (temas == "Backend" && dificultad == "1")
    listaPalabras = [
      "python",
      "ruby",
      "php",
      "java",
      "perl",
      "kotlin",
      "scala",
    ];
  if (temas == "Backend" && dificultad == "2")
    listaPalabras = ["open resty", "asp net", "opengse", "nodejs"];
  palabraAleatorias();
  generarEspacio();
}
//generar la palabra aleatoria
function palabraAleatorias() {
  let i, posAleatoriaListaPalabras;
  for (i = listaPalabras.length; i; i--) {
    posAleatoriaListaPalabras = Math.floor(Math.random() * i);
    palabraAleatoria = listaPalabras[i - 1];
    listaPalabras[i - 1] = listaPalabras[posAleatoriaListaPalabras];
    listaPalabras[posAleatoriaListaPalabras] = palabraAleatoria;
  }
}
//generar espacios
function generarEspacio() {
  let html = "";
  for (let i = 0; i < palabraAleatoria.length; i++) {
    if (palabraAleatoria.charAt(i) == " ") {
      html += `
          <span class='espacio'></span>
          `;
    } else {
      html += `
          <span class='letra'></span>
          `;
    }
  }
  $("#resultado").html(html);
  $("#nombreUsuario").html(nombre);
  $("#tema").html(temas);
}
//crear el span
function escribirSpan(indice, letraUsuario) {
  let lista_span = $("span");
  for (let i = 0; i < lista_span.length; i++) {
    if (i == indice) {
      lista_span[i].innerHTML = letraUsuario;
    }
  }
}
//incluir la letra
function incluirLetra(letra) {
  let div_letras_fallidas = $("#acertadas"),
    html = div_letras_fallidas.html();
  letra = letra.toLowerCase();
  for (let i = 0; i < palabraAleatoria.length; i++) {
    if (palabraAleatoria.charAt(i) == letra) {
      escribirSpan(i, letra);
      aciertos++;
    }
  }
  if (aciertos == palabraAleatoria.replace(new RegExp(" ", "g"), "").length) {
    gane();
  }
  //validacion para el historial
  if (html == "") {
    html = letra;
  } else {
    html += " " + letra;
  }

  div_letras_fallidas.html(html);
}
//local storage
function sincronizarStorage() {
  localStorage.setItem("grillaTabla", JSON.stringify(arregloTabla));
}
//verificar letra probada
function verificarLetraProbada(letra) {
  letra = letra.toLowerCase();
  if (letras_probadas.indexOf(letra) != -1) {
    return true;
  } else {
    return false;
  }
}
//verificar letra
function verificarLetra(letra) {
  letra = letra.toLowerCase();
  if (palabraAleatoria.indexOf(letra) != -1) {
    return true;
  } else {
    return false;
  }
}
//probar la letra
function probarLetra() {
  let input_probar_letra = letraUsuario;
  if (verificarLetra(input_probar_letra)) {
    incluirLetra(input_probar_letra);
  } else {
    incluirFallo(input_probar_letra);
  }
}
//incluir fallos
function incluirFallo(letra) {
  estadoFallos = "fallo";
  fallos++;
  let div_letras_fallidas = $("#historial"),
    html = div_letras_fallidas.html();
  letra = letra.toLowerCase();
  numIntentos--;
  $("#intentos").html(numIntentos);
  seleccionarPista();

  if (fallos == 0) {
    $("#imagen_ahorcado").attr("src", "src/img/ahorcado0.png");
  } else if (fallos == 1) {
    $("#imagen_ahorcado").attr("src", "src/img/ahorcado1.png");
  } else if (fallos == 2) {
    $("#imagen_ahorcado").attr("src", "src/img/ahorcado2.png");
  } else if (fallos == 3) {
    $("#imagen_ahorcado").attr("src", "src/img/ahorcado3.png");
  } else if (fallos == 4) {
    $("#imagen_ahorcado").attr("src", "src/img/ahorcado4.png");
  } else if (fallos == 5) {
    $("#imagen_ahorcado").attr("src", "src/img/ahorcado5.png");
  }
  //validacion para el historial
  if (html == "") {
    html = letra;
  } else {
    html += "-" + letra;
  }

  div_letras_fallidas.html(html);

  if (fallos === 5) {
    perdida();
    //div_letras_fallidas.html("");
  }
}
//mostrar la pista despues del tercer fallo
function seleccionarPista() {
  if (palabraAleatoria === "caballo" && fallos >= 3)
    $("#pista").html("Pista: animal que físicamente poseen un gran porte");
  if (palabraAleatoria === "oveja" && fallos >= 3)
    $("#pista").html("Pista: produce carne y lana");
  if (palabraAleatoria === "cerdo" && fallos >= 3)
    $("#pista").html("Pista: cuadrúpedo con patas cortas y pezuñas");
  if (palabraAleatoria === "chimpance" && fallos >= 3)
    $("#pista").html("Pista: pariente mas cercano de los humanos");
  if (palabraAleatoria === "blanco" && fallos >= 3)
    $("#pista").html("Pista: color de la nieve");
  if (palabraAleatoria === "naranja" && fallos >= 3)
    $("#pista").html("Pista: es color y fruta");
  if (palabraAleatoria === "azul" && fallos >= 3)
    $("#pista").html("Pista: color del cielo");
  if (palabraAleatoria === "negro" && fallos >= 3)
    $("#pista").html("Pista: es la ausencia de luz");
  if (palabraAleatoria === "mango" && fallos >= 3)
    $("#pista").html("Pista: maduro es dulce, y ácido cuando aún está verde");
  if (palabraAleatoria === "fresa" && fallos >= 3)
    $("#pista").html("Pista: generalmente a las personas presumidas");
  if (palabraAleatoria === "cereza" && fallos >= 3)
    $("#pista").html("Pista: Las palabras y las ------ unas con otras se ");
  if (palabraAleatoria === "nance" && fallos >= 3)
    $("#pista").html("Pista: un viejito con tres pelitos en el culito");
  if (palabraAleatoria === "caballito de mar" && fallos >= 3)
    $("#pista").html("Pista: posee un cuello como de caballo");
  if (palabraAleatoria === "leon marino" && fallos >= 3)
    $("#pista").html("Pista: comparte muchas caracteristica con a foca");
  if (palabraAleatoria === "estrella de mar" && fallos >= 3)
    $("#pista").html("Pista: posee cinco brazos");
  if (palabraAleatoria === "oso panda" && fallos >= 3)
    $("#pista").html("Pista: animal que practica el kung fu");
  if (palabraAleatoria === "ciruela pasa" && fallos >= 3)
    $("#pista").html("Pista: fruta desnutrida");
  if (palabraAleatoria === "higo seco" && fallos >= 3)
    $("#pista").html("Pista: resultado de la deshidratacion del higo");
  if (palabraAleatoria === "orejones de albaricoque" && fallos >= 3)
    $("#pista").html("Pista: son mitades de albaricoques");
  if (palabraAleatoria === "orejones de melocoton" && fallos >= 3)
    $("#pista").html("Pista: son mitades de melocoton");
  if (palabraAleatoria === "verde oliva" && fallos >= 3)
    $("#pista").html("Pista: color y palmera");
  if (palabraAleatoria === "amarillo lima" && fallos >= 3)
    $("#pista").html("Pista: color y fruta");
  if (palabraAleatoria === "lavanda floral" && fallos >= 3)
    $("#pista").html("Pista: color y flor");
  if (palabraAleatoria === "azul marino" && fallos >= 3)
    $("#pista").html("Pista: color y referente al mar");
  if (palabraAleatoria === "leon" && fallos >= 3)
    $("#pista").html("Pista: Rey de la Selva");
  if (palabraAleatoria === "iguana" && fallos >= 3)
    $("#pista").html("Pista:  animal ovíparo, reptil");
  if (palabraAleatoria === "elefante" && fallos >= 3)
    $("#pista").html("Pista:  posee una larga trompa");
  if (palabraAleatoria === "ardilla" && fallos >= 3)
    $("#pista").html(
      "Pista:  son auténticas acróbatas, saltan de un arbol a otro"
    );
  if (palabraAleatoria === "cocodrilo" && fallos >= 3)
    $("#pista").html("Pista:  su alimentación es carnívora, reptil");
  if (palabraAleatoria === "zorro" && fallos >= 3)
    $("#pista").html("Pista:  astuto");
  if (palabraAleatoria === "papaya" && fallos >= 3)
    $("#pista").html(
      "Pista:  la pulpa es roja anaranjada o amarilla, dulce y muy jugosa"
    );
  if (palabraAleatoria === "kiwi" && fallos >= 3)
    $("#pista").html("Pista:  contribuye a la salud digestiva");
  if (palabraAleatoria === "banano" && fallos >= 3)
    $("#pista").html(
      "Pista:  es considera una planta, pero en realidad es una hierba"
    );
  if (palabraAleatoria === "manzana" && fallos >= 3)
    $("#pista").html("Pista: su es forma redonda y sabor muy dulce");
  if (palabraAleatoria === "caqui" && fallos >= 3)
    $("#pista").html("Pista: son ideal para desintoxicar el organismo");
  if (palabraAleatoria === "uva" && fallos >= 3)
    $("#pista").html(
      "Pista: ayuda para mantener una presión arterial saludable"
    );
  if (palabraAleatoria === "coco" && fallos >= 3)
    $("#pista").html("Pista: se puede beber su agua sin romper la cáscara");
  if (palabraAleatoria === "maracuya" && fallos >= 3)
    $("#pista").html("Pista: su fruto es una baya");
  if (palabraAleatoria === "marron" && fallos >= 3)
    $("#pista").html(
      "Pista: se asocia frecuentemente con emociones desagradables"
    );
  if (palabraAleatoria === "rosa" && fallos >= 3)
    $("#pista").html("Pista: se asocia a la pantera");
  if (palabraAleatoria === "turqueza" && fallos >= 3)
    $("#pista").html("Pista: se le conoce como verde azulado");
  if (palabraAleatoria === "cian" && fallos >= 3)
    $("#pista").html("Pista: se deriva de un celeste saturado");
  if (palabraAleatoria === "rojo" && fallos >= 3)
    $("#pista").html("Pista: color primario");
  if (palabraAleatoria === "zafiro" && fallos >= 3)
    $("#pista").html("Pista: mineral");
  if (palabraAleatoria === "mysql" && fallos >= 3)
    $("#pista").html("Pista: My Structured Query Language");
  if (palabraAleatoria === "orientdb" && fallos >= 3)
    $("#pista").html("Pista: base de datos orientado a documentos");
  if (palabraAleatoria === "couchdb" && fallos >= 3)
    $("#pista").html(
      "Pista: se utiliza para facilitar la accesibilidad y compatibilidad web con una diversidad de dispositivos."
    );
  if (palabraAleatoria === "mariadb" && fallos >= 3)
    $("#pista").html("Pista: se deriva de MySQL");
  if (palabraAleatoria === "mongodb" && fallos >= 3)
    $("#pista").html("Pista: del inglés humongous, 'enorme'");
  if (palabraAleatoria === "postgresql" && fallos >= 3)
    $("#pista").html("Pista:  también llamado Postgres");
  if (palabraAleatoria === "firebird" && fallos >= 3)
    $("#pista").html("Pista:  pájaro de fuego");
  if (palabraAleatoria === "oracle database" && fallos >= 3)
    $("#pista").html(
      "Pista:  fundada por la empresa de consultoría Software Development Laboratories "
    );
  if (palabraAleatoria === "inter systems cache" && fallos >= 3)
    $("#pista").html(
      "Pista:  se utuliza para la gestión de grandes volúmenes de datos"
    );
  if (palabraAleatoria === "microsoft access" && fallos >= 3)
    $("#pista").html("Pista:  sucesor de Embedded Basic");
  if (palabraAleatoria === "microsoft sql server" && fallos >= 3)
    $("#pista").html(
      "Pista:  base de datos relacional producido por Microsoft"
    );
  if (palabraAleatoria === "html" && fallos >= 3)
    $("#pista").html("Pista:  Lenguaje de Marcas de Hipertexto");
  if (palabraAleatoria === "css" && fallos >= 3)
    $("#pista").html("Pista:  hojas de estilo en cascada");
  if (palabraAleatoria === "react" && fallos >= 3)
    $("#pista").html(
      "Pista: sirve para crear interfaces de usuario interactivas de forma sencilla"
    );
  if (palabraAleatoria === "vue" && fallos >= 3)
    $("#pista").html("Pista: framework Javascript");
  if (palabraAleatoria === "elm" && fallos >= 3)
    $("#pista").html(
      "Pista: Los programas procesan HTML a través de un DOM virtual"
    );
  if (palabraAleatoria === "javascript" && fallos >= 3)
    $("#pista").html("Pista: es un lenguaje de programación interpretado");
  if (palabraAleatoria === "jquery" && fallos >= 3)
    $("#pista").html(
      "Pista: consiste en un único fichero JavaScript que contiene las funcionalidades comunes de DOM"
    );
  if (palabraAleatoria === "typescript" && fallos >= 3)
    $("#pista").html(
      "Pista: su principal característica de Typescript es el tipado estático"
    );
  if (palabraAleatoria === "angular" && fallos >= 3)
    $("#pista").html("Pista:  framework desarrollado por Google");
  if (palabraAleatoria === "sass" && fallos >= 3)
    $("#pista").html("Pista:  es un procesador CSS");
  if (palabraAleatoria === "python" && fallos >= 3)
    $("#pista").html(
      "Pista:  El emblema representa una imagen de serpientes de dos colores"
    );
  if (palabraAleatoria === "ruby" && fallos >= 3)
    $("#pista").html("Pista:  gema");
  if (palabraAleatoria === "php" && fallos >= 3)
    $("#pista").html("Pista:   Hypertext Preprocessor");
  if (palabraAleatoria === "perl" && fallos >= 3)
    $("#pista").html(
      "Pista:  originalmente desarrollado para la manipulación de texto"
    );
  if (palabraAleatoria === "kotlin" && fallos >= 3)
    $("#pista").html("Pista:  es ideal para desarrollos basados en JVM");
  if (palabraAleatoria === "scala" && fallos >= 3)
    $("#pista").html(
      "Pista:  diseñado para expresar patrones comunes de programación en forma concisa"
    );
  if (palabraAleatoria === "open resty" && fallos >= 3)
    $("#pista").html(
      "Pista:  fue originalmente un proyecto de empresa de Yahoo"
    );
  if (palabraAleatoria === "asp net" && fallos >= 3)
    $("#pista").html(
      "Pista:  es un marco de desarrollo web que se utiliza para crear excelentes aplicaciones web"
    );
  if (palabraAleatoria === "opengse" && fallos >= 3)
    $("#pista").html(
      "Pista:  es una plataforma completa de aplicaciones geoespaciales"
    );
  if (palabraAleatoria === "nodejs" && fallos >= 3)
    $("#pista").html(
      "Pista:  es un entorno de tiempo de ejecución de JavaScript "
    );
  if (palabraAleatoria === "java" && fallos >= 3)
    $("#pista").html(
      "Pista:  comercializada por primera vez en 1995 por Sun Microsystems"
    );
}
//funcion para ganar
function gane() {
  conAcietos = conAcietos + aciertos;
  conFallos = conFallos + fallos;
  swal({
    title: `BIEN HECHO!!!`,
    text: `Has ganado!!!.
                  `,
    icon: "success",
  });
  contadorPuntos++;
  $("#puntos").html(contadorPuntos);
  reiniciar();
  estado = "ganar";
  estadoAciertos = "acierto";
  verificarEstadoPartida();
  setTimeout(() => {
    contaFallida = 0;
    $("#pista").html("Aun no hay pistas disponibles...");
    prepararJuego(datos);
    document.querySelector("#imagen_ahorcado").src = "src/img/ahorcado0.png";
  }, 3000);
  mostrarPalabra("gane");
}
//funcion para saber si perdio
function perdida() {
  conAcietos = conAcietos + aciertos;
  conFallos = conFallos + fallos;
  estado = "perder";
  verificarEstadoPartida();
  $("#imagen_ahorcado").attr("src", "src/img/ahorcado5.png");
  setTimeout(() => {
    $("#pista").html("Aun no hay pistas disponibles...");
    prepararJuego(datos);
    document.querySelector("#imagen_ahorcado").src = "src/img/ahorcado0.png";
  }, 3000);
  mostrarPalabra("perdida");
  perdio = true;
}
//validaciones y contadores de la tabla
function verificarEstadoPartida() {
  let contadorGanador = 0;
  let contadorPerdedor = 0;
  let terminadas = 0;
  let canceladas = 0;
  let contaAcertadas = 0;
  let contaNoAcertadas = 0;
  if (contaAcertadas === 0) {
    contaAcertadas = conAcietos;
  }
  if (contaNoAcertadas === 0) {
    contaNoAcertadas = conFallos;
  }
  if (contadorPerdedor === 0 && estado === "perder") {
    contadorPerdedor = 1;
    terminadas = 1;
  }
  if (contadorGanador === 0 && estado === "ganar") {
    contadorGanador = 1;
    terminadas = 1;
  }
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
        if (estado === "ganar") {
          datos.contadorGanador++;
          datos.terminadas++;
        }
        if (estado === "perder") {
          datos.contadorPerdedor++;
          datos.terminadas++;
        }
        if (estadoAciertos === "acierto") {
          datos.contaAcertadas = conAcietos;
        }
        if (estadoFallos === "fallo") {
          datos.contaNoAcertadas = conFallos;
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
//funcion para mostrar la palabra
function mostrarPalabra(opcion) {
  let html = "";
  for (let i = 0; i < palabraAleatoria.length; i++) {
    if (palabraAleatoria.charAt(i) == " ") {
      html += `
              <span class='espacio'>${palabraAleatoria.charAt(i)}</span>
          `;
    } else {
      html += `
              <span class='letra letra-${opcion}'>${palabraAleatoria.charAt(
        i
      )}</span>
          `;
    }
  }
  $("#resultado").html(html);
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
//reiniciar arreglos y contadores
function reiniciar() {
  mostrarLetra(this);
  canceladas = 0;
  fallos = 0;
  aciertos = 0;
  resultados = 0;
  document.querySelector("#imagen_ahorcado").src = "src/img/ahorcado0.png";
  $("#historial").html("");
  $("#acertadas").html("");
}
// limpiar las filas de la tabla
function vaciarHTML() {
  let elmtTable = document.getElementById("grilla");
  let tableRows = elmtTable.getElementsByTagName("tr");
  let rowCount = tableRows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    elmtTable.removeChild(tableRows[i]);
  }
  sincronizarStorage();
}
//tabla de clasificaciones
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
      contaNoAcertadas,
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
