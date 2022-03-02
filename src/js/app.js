var usuario = "";
$("#btnIniciar").click(function () { 
    if(verificar($("#nUsuario")) == false){
        alert("Debe ingresar su nombre");
    }else if(verificar($("#dificultad")) == false){
        alert("Debe seleccionar la dificultad");
    }else{
        usuario = $("#nUsuario").val();
        $("#parte1").addClass("ocultar");
        $("#parte2").removeClass("ocultar");
        $("#opcs").removeClass("d-none");
        $("#nombre").html(usuario);
        $("#oportunidad").html("3");
        $("#puntos").html("0");
    }

    function verificar(objeto){
        if($(objeto).val().length < 1) return false;
        else return true;
    }
});

$("#btnAbandonar").click(function () { 
    $("#parte1").removeClass("ocultar");
    $("#parte2").addClass("ocultar");
    $("#opcs").addClass("d-none");
});