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
   		url:"Producto", //Servlet
		data: "listar",
		dataType:"json",
		success: function(resultado){
			for(let u of resultado){
				tablaUsuarios.row.add(
					[
						`${u.codigoProducto}`,
						`${u.nitProveedor}`,
						`${u.ivaCompra}`,
						`${u.nombreProducto}`,
						`${u.precioCompra}`,
						`${u.precioVenta}`,
						'<div class="btn-group">'+
						'<button type="button" name="'+`${u.codigoProducto}`+'"  class="btn btn-warning btnVer">Editar</button>'+
						'<button type="button"  name="'+`${u.codigoProducto}`+'" class="btn btn-danger btnBorrar">Borrar</button>'+
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
		var codigo = $(this).attr("name")
	 	var opcion = confirm("Esta seguro que desea borrar el registro: "+codigo);
	    if(opcion == true){
			eliminarProducto(codigo);
		}else{
		   
		}
	})
	
	//Click boton ver/editar
	tablaUsuarios.on('click', '.btnVer', function(){
		var codigo = $(this).attr("name")
		verProducto(codigo);
	});
	
	//Funcion agregar producto
	$("#formAgregar").submit(function(e){
		var form = $('#formAgregar')[0];
		var data = new FormData(form);
		e.preventDefault();
		$.ajax({
			type:"post",
	   		url:"Producto", //Servlet
			data: data,
	        enctype: 'multipart/form-data',
	        processData: false,  // Important!
	        contentType: false,
	        cache: false,
			success: function(resultado){
				resultado = JSON.parse(resultado);
				if(resultado[0].estado=="Ok"){
					alert("Productos ingresados");
					window.location.replace("productos.jsp");
				}else{
					alert(resultado[0].estado);
				}
			}
		});
	})
	
	//Funcion editar usuario
	$("#formEditar").submit(function(e){
		e.preventDefault();
		$.ajax({
			type:"post",
	   		url:"Producto", //Servlet
			data: $("#formEditar").serialize(),
			dataType:"json",
			success: function(resultado){
				if(resultado[0].estado=="Ok"){
					alert("Registro actualizado");
					window.location.replace("productos.jsp");
				}
			}
		});
	})
	
	//Funcion eliminar usuario
	function eliminarProducto(id){
		$.ajax({
			type:"post",
	   		url:"Producto", //Servlet
			data: "borrar=&codigo="+id,
			dataType:"json",
			success: function(resultado){
				if(resultado[0].estado=="Ok"){
					alert("Registro eliminado");
					window.location.replace("productos.jsp");
				}
			}
		});
	}
	
	//Funcion traer producto
	function verProducto(id){
		$.ajax({
			type:"post",
	   		url:"Producto", //Servlet
			data: "ver=&codigo="+id,
			dataType:"json",
			success: function(resultado){
				console.log(resultado);
				if(resultado!=null){
					$("#codigo").val(resultado.codigoProducto);
					$("#ivaCompra").val(resultado.ivaCompra);
					$("#nitProveedor").val(resultado.nitProveedor);
					$("#nombre").val(resultado.nombreProducto);
					$("#precioCompra").val(resultado.precioCompra);
					$("#precioVenta").val(resultado.precioVenta);
				}
				var modalEdit = new bootstrap.Modal(document.getElementById('modalEditarUsuario'))
				modalEdit.show()
			}
		});
	}
	
	
});