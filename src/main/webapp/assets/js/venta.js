$(document).ready(function(){
	$('.valorProducto').val(0);
	$('.valorProducto').attr("value",0);
	//Funcion consultar cliente
	$("#buscarCliente").submit(function(e){
		e.preventDefault();
		var id = $("#cedulaCliente").val();
		$.ajax({
			type:"post",
	   		url:"Cliente", //Servlet
			data: "ver=&cedula="+id,
			dataType:"json",
			success: function(resultado){
				console.log(resultado);
				if(resultado.cedulaCliente!=null){
					$("#cedula").val(resultado.cedulaCliente);
					$("#nombreCliente").html(resultado.nombreCliente);
					$("#direccionCliente").html(resultado.direccionCliente);
					$("#emailCliente").html(resultado.emailCliente);
					$("#telefonoCliente").html(resultado.telefonoCliente);
				}else{
					$("#cedula, #nombreCliente, #direccionCliente, #emailCliente, #telefonoCliente").html("");
					alert("Ocurrio un error");
				}
			}
		});
	})
	
	//Funcion buscar producto
	$(".codigoProducto").blur(function(e){
		e.stopPropagation();
		var td = $(this);
		var id = $(this).val();
		$.ajax({
			type:"post",
	   		url:"Producto", //Servlet
			data: "ver=&codigo="+id,
			dataType:"json",
			success: function(resultado){
				if(resultado.codigoProducto!=null){
					td.parent().next().children().val(resultado.nombreProducto);
					td.parent().next().next().next().children().val(resultado.precioVenta);
					td.parent().next().next().next().children().attr("data-value",resultado.precioVenta);
				}else{
					alert("Ocurrio un error");
					td.parent().next().children().val("");
					td.parent().next().next().next().children().val(0);
					td.parent().next().next().next().children().attr(0);
				}
			}
		});
	})
	
	//Funcion calcular valor cantidad
	$(".cantidadProducto").blur(function(e){
		e.stopPropagation();
		var td = $(this);
		var cantidad = parseFloat($(this).val());
		var precio = td.parent().next().children().attr("data-value");
		if(isNaN(precio)) {
			var precio = 0;
		}
		var total = cantidad*precio;
		td.parent().next().children().attr("value", total);
		td.parent().next().children().val(total);
		calcularTotal();
	})
	
	function calcularTotal(){
		var subtotal = 0;
		var iva=19;
		$('.valorProducto').each(function(){
		    subtotal += parseFloat($(this).attr("value"));
		});
		$(".subTotal").html(subtotal);
		var valorIva = (subtotal*iva)/100;
		$(".valorIVA").html(valorIva);
		$(".valorTotal").html(subtotal+valorIva);
		//Pasar datos a formulario
		$("#subtotal").val(subtotal);
		$("#iva").val(valorIva);
		$("#total").val(subtotal+valorIva);
	}
	
});