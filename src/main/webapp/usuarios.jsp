<%@ page import="modelo.UsuarioDTO" %>
<%@ page import="modelo.UsuarioDAO" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.List" %>
<%@ page language="java" contentType="text/html" pageEncoding="UTF-8"%>
<%
	UsuarioDAO uDAO = new UsuarioDAO();
	UsuarioDTO uDTO;
	List<UsuarioDTO> listaUsuarios = uDAO.listarUsuarios();
%>
<%
if(request.getParameter("msj")!=null){
	String mensaje = request.getParameter("msj");
	out.print("<script type='text/javascript'>alert('"+mensaje+"')</script>");
}
%>
<!doctype html>
<html lang="es">
 	<head>
	    <!-- Required meta tags -->
	    <meta charset="utf-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	    <link rel="shortcut icon" href="#" />  
	    <title>Users</title>
	      
	    <!-- Bootstrap CSS & Style CSS-->
	    <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" href="assets/css/style.css">
		<!-- DataTables CSS-->
		<link rel="stylesheet" href="assets/vendor/DataTables/datatables.min.css">
	</head>
	<body>
		<header class="bg-blue pt-2 pb-1">
			<h4 class="text-center text-light">CRUD Usuarios
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
					<table id="tablaUsuarios" class="table table-bordered table-striped">
						<thead>
							<tr>
								<th>C&eacute;dula</th>
								<th>Email</th>
								<th>Nombre</th>
								<th>Usuario</th>
								<th>Acciones</th>
							</tr>
						</thead>
						<tbody>
						<%
						for (UsuarioDTO u : listaUsuarios) {
							long cedula = u.getCedulaUsuario();
							String email = u.getEmailUsuario();
							String nombre = u.getNombreUsuario();
							String usuario = u.getUsuario();
						%>
							<tr>
								<td><%=cedula %></td>
								<td><%=email %></td>
								<td><%=nombre %></td>
								<td><%=usuario %></td>
								<td class="text-center">
									<div class="btn-group">
										<form class="my-0" action="Usuario" method="POST">
											<input type="hidden" name="cedula" value="<%=cedula%>">
											<button type="submit" name="editar"  class="btn btn-warning">Editar</button>
											<button type="submit" name="borrar" class="btn btn-danger btnBorrar">Borrar</button>
										</form>
									</div>
								</td>
							</tr>
						<%
						}
						%>
						</tbody>
					</table>
				</div>
			</div>
    </div>

	<!-- Modal -->
	<div class="modal fade" id="modalAgregarUsuario" tabindex="-1" aria-labelledby="modalAgregarUsuarioLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Agregar Usuario</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<form class="row" action="Usuario" method="POST">
						<div class="col-sm-12">
							<label for="cedula" class="form-label">C&eacute;dula</label>
							<input type="tel" class="form-control" name="cedula" required>
						</div>
						<div class="col-sm-12">
							<label for="email" class="form-label">Email</label>
							<input type="email" class="form-control" name="email" required>
						</div>
						<div class="col-sm-12">
							<label for="nombre" class="form-label">Nombre</label>
							<input type="text" class="form-control" name="nombre" required>
						</div>
						<div class="col-sm-12">
							<label for="usuario" class="form-label">Nombre de Usuario</label>
							<input type="text" class="form-control" name="usuario" required>
						</div>
						<div class="col-sm-12">
							<label for="password" class="form-label">Password</label>
							<input type="password" class="form-control" name="password" required>
						</div>
						<div class="col-sm-12 mt-3">
							<button type="button" class="btn btn-secondary float-start" data-bs-dismiss="modal">Cancelar</button>
							<button type="submit" name="insertar"  class="btn btn-primary float-end">Guardar</button>
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
	<script type="text/javascript" src="assets/js/user.js"></script>
	</body>
</html>
