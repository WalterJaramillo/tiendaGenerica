$(document).ready(function(){
	
	//Funcion para datatable
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
	
	//Funcion inicial para listar
	$.ajax({
		type:"post",
   		url:"Usuario", //Servlet
		data: "listar",
		dataType:"json",
		success: function(resultado){
			for(let u of resultado){
				tablaUsuarios.row.add(
					[
						`${u.cedulaUsuario}`,
						`${u.emailUsuario}`,
						`${u.nombreUsuario}`,
						`${u.usuario}`,
						'<div class="btn-group">'+
						'<button type="button" name="'+`${u.cedulaUsuario}`+'"  class="btn btn-warning btnVer">Editar</button>'+
						'<button type="button"  name="'+`${u.cedulaUsuario}`+'" class="btn btn-danger btnBorrar">Borrar</button>'+
						'</div>'
					]
				)
			}
			tablaUsuarios.draw()
			tablaUsuarios.columns.adjust().responsive.recalc();
		}
	});
	
	//Click boton borrar
	tablaUsuarios.on('click', '.btnBorrar', function(){	
		var cedula = $(this).attr("name")
	 	var opcion = confirm("Esta seguro que desea borrar el registro: "+cedula);
	    if(opcion == true){
			eliminarUsuario(cedula);
		}else{
		   
		}
	})
	
	//Click boton ver/editar
	tablaUsuarios.on('click', '.btnVer', function(){
		var cedula = $(this).attr("name")
		verUsuario(cedula);
	});
	
	//Funcion agregar usuario
	$("#formAgregar").submit(function(e){
		e.preventDefault();
		$.ajax({
			type:"post",
	   		url:"Usuario", //Servlet
			data: $("#formAgregar").serialize(),
			dataType:"json",
			success: function(resultado){
				if(resultado[0].estado=="Ok"){
					alert("Registro ingreasdo");
					window.location.replace("usuarios.jsp");
				}
			}
		});
	})
	
	//Funcion editar usuario
	$("#formEditar").submit(function(e){
		e.preventDefault();
		$.ajax({
			type:"post",
	   		url:"Usuario", //Servlet
			data: $("#formEditar").serialize(),
			dataType:"json",
			success: function(resultado){
				if(resultado[0].estado=="Ok"){
					alert("Registro ingreasdo");
					window.location.replace("usuarios.jsp");
				}
			}
		});
	})
	
	//Funcion eliminar usuario
	function eliminarUsuario(id){
		$.ajax({
			type:"post",
	   		url:"Usuario", //Servlet
			data: "borrar=&cedula="+id,
			dataType:"json",
			success: function(resultado){
				if(resultado[0].estado=="Ok"){
					alert("Registro eliminado");
					window.location.replace("usuarios.jsp");
				}
			}
		});
	}
	
	//Funcion traer usuario
	function verUsuario(id){
		$.ajax({
			type:"post",
	   		url:"Usuario", //Servlet
			data: "ver=&cedula="+id,
			dataType:"json",
			success: function(resultado){
				console.log(resultado);
				if(resultado!=null){
					$("#cedula").val(resultado.cedulaUsuario)
					$("#email").val(resultado.emailUsuario)
					$("#nombre").val(resultado.nombreUsuario)
					$("#usuario").val(resultado.usuario)
					$("#password").val(resultado.password)
				}
				var modalEdit = new bootstrap.Modal(document.getElementById('modalEditarUsuario'))
				modalEdit.show()
			}
		});
	}
	
	
});