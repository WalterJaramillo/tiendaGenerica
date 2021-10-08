$(document).ready(function(){
	
	//Funcion para datatable
	tablaUsuarios = $("#tablaUsuarios").DataTable({
	responsive: true,
	"ordering": false,
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
   		url:"Proveedor", //Servlet
		data: "listar",
		dataType:"json",
		success: function(resultado){
			for(let u of resultado){
				tablaUsuarios.row.add(
					[
						`${u.nitProveedor}`,
						`${u.ciudadProveedor}`,
						`${u.direccionProveedor}`,
						`${u.nombreProveedor}`,
						`${u.telefonoProveedor}`,
						'<div class="btn-group">'+
						'<button type="button" name="'+`${u.nitProveedor}`+'"  class="btn btn-warning btnVer">Editar</button>'+
						'<button type="button"  name="'+`${u.nitProveedor}`+'" class="btn btn-danger btnBorrar">Borrar</button>'+
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
		var nit= $(this).attr("name")
	 	var opcion = confirm("Esta seguro que desea borrar el registro: "+nit);
	    if(opcion == true){
			eliminarProveedor(nit);
		}else{
		   
		}
	})
	
	//Click boton ver/editar
	tablaUsuarios.on('click', '.btnVer', function(){
		var nit = $(this).attr("name")
		verProveedor(nit);
	});
	
	//Funcion agregar usuario
	$("#formAgregar").submit(function(e){
		e.preventDefault();
		$.ajax({
			type:"post",
	   		url:"Proveedor", //Servlet
			data: $("#formAgregar").serialize(),
			dataType:"json",
			success: function(resultado){
				if(resultado[0].estado=="Ok"){
					alert("Registro ingresado");
					window.location.replace("proveedores.jsp");
				}
			}
		});
	})
	
	//Funcion editar usuario
	$("#formEditar").submit(function(e){
		e.preventDefault();
		$.ajax({
			type:"post",
	   		url:"Proveedor", //Servlet
			data: $("#formEditar").serialize(),
			dataType:"json",
			success: function(resultado){
				if(resultado[0].estado=="Ok"){
					alert("Registro actualizado");
					window.location.replace("proveedores.jsp");
				}
			}
		});
	})
	
	//Funcion eliminar usuario
	function eliminarProveedor(id){
		$.ajax({
			type:"post",
	   		url:"Proveedor", //Servlet
			data: "borrar=&nit="+id,
			dataType:"json",
			success: function(resultado){
				if(resultado[0].estado=="Ok"){
					alert("Registro eliminado");
					window.location.replace("proveedores.jsp");
				}
			}
		});
	}
	
	//Funcion traer usuario
	function verProveedor(id){
		$.ajax({
			type:"post",
	   		url:"Proveedor", //Servlet
			data: "ver=&nit="+id,
			dataType:"json",
			success: function(resultado){
				console.log(resultado);
				if(resultado!=null){
					$("#nit").val(resultado.nitProveedor)
					$("#ciudad").val(resultado.ciudadProveedor)
					$("#direccion").val(resultado.direccionProveedor)
					$("#nombre").val(resultado.nombreProveedor)
					$("#telefono").val(resultado.telefonoProveedor)
				}
				var modalEdit = new bootstrap.Modal(document.getElementById('modalEditarUsuario'))
				modalEdit.show()
			}
		});
	}
	
	
});