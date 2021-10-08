<%@ page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<!doctype html>
<html lang="es">
 	<head>
	    <!-- Required meta tags -->
	    <meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	    <link rel="shortcut icon" href="#" />  
	    <title>Clientes</title>
	      
	    <!-- Bootstrap CSS & Style CSS-->
	    <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="assets/css/style.css">
		<!-- DataTables CSS-->
		<link rel="stylesheet" href="assets/vendor/DataTables/datatables.min.css">
	</head>
	<body>
		<header class="bg-blue pt-2 pb-1">
			<h4 class="text-center text-light">CRUD Productos
				<span class="badge bg-danger">Mintic</span>
			</h4>
		</header>
      
		<div class="container mt-4">
			
			<div class="row">
				<div class="col-md-12">
					<button id="btnNuevo" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAgregarUsuario">Nuevo</button>
				</div>
			</div>

			<div class="row mt-3">
				<div class="col-md-12">
					<table id="tablaUsuarios" class="table table-bordered table-striped" width="100%">
						<thead>
							<tr>
								<th>Codigo</th>
								<th>Proveedor</th>
								<th>IVA Compra</th>
								<th>Nombre</th>
								<th>Precio Compra</th>
								<th>Precio Venta</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody id="bodyTable">
							
						</tbody>
					</table>
				</div>
			</div>
    </div>

	<!-- Modal Agregar -->
	<div class="modal fade" id="modalAgregarUsuario" tabindex="-1" aria-labelledby="modalAgregarUsuarioLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Agregar Producto</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form class="row" id="formAgregar" method="POST" action="Producto" enctype="multipart/form-data">
						<input type="hidden" name="cargar" value="">
						<div class="col-sm-12">
							<label for="csv" class="form-label">Archivo CSV</label>
							 <input class="form-control" type="file" id="archivo" name="archivo">
						</div>
						<div class="col-sm-12 mt-3">
							<button type="button" class="btn btn-secondary float-start" data-bs-dismiss="modal">Cancelar</button>
							<button type="submit" class="btn btn-primary float-end">Guardar</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Modal Editar -->
	<div class="modal fade" id="modalEditarUsuario" tabindex="-1" aria-labelledby="modalAgregarUsuarioLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Editar Producto</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form class="row" id="formEditar">
					<input type="hidden" name="editar" value="">
						<div class="col-sm-12">
							<label for="codigo" class="form-label">Codigo</label>
							<input type="tel" class="form-control" name="codigo" id="codigo" readonly required>
						</div>
						<div class="col-sm-12">
							<label for="ivaCompra" class="form-label">IVA Compra</label>
							<input type="text" class="form-control" name="ivaCompra" id="ivaCompra" required>
						</div>
						<div class="col-sm-12">
							<label for="nitProveedor" class="form-label">NIT Proveedor</label>
							<input type="tel" class="form-control" name="nitProveedor" id="nitProveedor" required>
						</div>
						<div class="col-sm-12">
							<label for="nombre" class="form-label">Nombre</label>
							<input type="text" class="form-control" name="nombre" id="nombre" required>
						</div>
						<div class="col-sm-12">
							<label for="precioCompra" class="form-label">Precio Compra</label>
							<input type="text" class="form-control" name="precioCompra" id="precioCompra" required>
						</div>
						<div class="col-sm-12">
							<label for="precioVenta" class="form-label">Precio Venta</label>
							<input type="text" class="form-control" name="precioVenta" id="precioVenta" required>
						</div>
						<div class="col-sm-12 mt-3">
							<button type="button" class="btn btn-secondary float-start" data-bs-dismiss="modal">Cancelar</button>
							<button type="submit"  class="btn btn-primary float-end">Editar</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
		
	<!-- Scripts Bootstrap & DataTables -->
	<script type="text/javascript" src="assets/vendor/bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="assets/vendor/DataTables/datatables.min.js"></script>
	<!-- Script Usuarios -->
	<script type="text/javascript" src="assets/js/product.js"></script>
	</body>
</html>
