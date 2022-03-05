var usuario = "";
$("#jugar").click(function () { 
    if(verificar($("#nombre")) == false){
    }else if(verificar($("#dificultad")) == false){    
    }else{
        usuario = $("#nombre").val();
        $("#agregar").addClass("ocultar");
        $("#parte2").removeClass("ocultar");
        $("#opcs").removeClass("d-none");
        $("#nombreUsuario").html(usuario);
        $("#puntos").html(0);
    }

    function verificar(objeto){
        if($(objeto).val().length < 1) return false;
        else return true;
    }
});

$("#abandonar").click(function () { 
    $("#agregar").removeClass("ocultar");
    $("#parte2").addClass("ocultar");
    $("#opcs").addClass("d-none");
});