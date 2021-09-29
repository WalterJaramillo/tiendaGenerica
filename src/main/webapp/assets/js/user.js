$(document).ready(function(){
	tablaUsuarios = $("#tablaUsuarios").DataTable({
	responsive: true,
	"language": {
		"lengthMenu": "Mostrar _MENU_ registros",
		"zeroRecords": "No se encontraron resultados",
		"info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
		"infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
		"infoFiltered": "(filtrado de un total de _MAX_ registros)",
		"sSearch": "Buscar:",
		"oPaginate": {
			"sFirst": "Primero",
			"sLast":"Último",
			"sNext":"Siguiente",
			"sPrevious": "Anterior"
		},
		"sProcessing":"Procesando...",
	}
});
tablaUsuarios;
$("#btnNuevo").click(function(){
    $("#formUsuarios").trigger("reset");
    $(".modal-header").css("background-color", "#28a745");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Nuevo usuario");            
    $("#modalCRUD").modal("show");        
    id=null;
    opcion = 1; //dar de alta 
});    
    
var fila; //capturar la fila para editar o borrar el registro
    
//botón EDITAR    
$(document).on("click", ".btnEditar", function(){
    fila = $(this).closest("tr");
    cedula = parseInt(fila.find('td:eq(0)').text());
    nombre = fila.find('td:eq(1)').text();
    email = fila.find('td:eq(2)').text();
    user = fila.find('td:eq(3)').text();
    password = fila.find('td:eq(4)').text();
    
    $("#cedula").val(cedula);
    $("#nombre").val(nombre);
    $("#email").val(email);
    $("#user").val(user);
    $("#password").val(password);
    opcion = 2; //editar
    
    $(".modal-header").css("background-color", "#007bff");
    $(".modal-header").css("color", "white");
    $(".modal-title").text("Editar Usuario");            
    $("#modalCRUD").modal("show");  
    
});

//botón BORRAR
$(document).on("click", ".btnBorrar", function(){
    fila = $(this);
    cedula = parseInt($(this).closest("tr").find('td:eq(0)').text());
    opcion = 3 //borrar
    var respuesta = confirm("¿Está seguro de eliminar el registro: "+cedula+"?");
    if(respuesta){
		return true;
		/*
        $.ajax({
            url: "users",
            type: "POST",
            dataType: "json",
            data: {opcion:opcion, cedula:cedula},
            success: function(){
                tablaUsuarios.row(fila.parents('tr')).remove().draw();
            }
        });
		*/
    }else{
		return false;
	}
});
    
$("#formUsuarios").submit(function(e){
    e.preventDefault();    
    cedula = $.trim($("#cedula").val());
    nombre = $.trim($("#nombre").val());
    email = $.trim($("#email").val());    
    user = $.trim($("#user").val());
    password = $.trim($("#password").val());  
    $.ajax({
        url: "",  
        type: "POST",
        dataType: "json",
        data: {cedula:cedula, nombre:nombre, email:email, user:user, password:password},
        success: function(data){  
            console.log(data);          
            cedula = data[0].cedula;
            nombre = data[0].nombre;
            email = data[0].email;
            user = data[0].user;
            password = data[0].password;
            if(opcion == 1){tablaUsuarios.row.add([cedula,nombre,email,user,password]).draw();}
            else{tablaUsuarios.row(fila).data([cedula,nombre,email,user,password]).draw();}            
        }        
    });
    $("#modalCRUD").modal("hide");    
    
});    
});