package controlador;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import modelo.UsuarioDAO;
import modelo.UsuarioDTO;

/**
 * Servlet implementation class Usuario
 */
@WebServlet("/Usuario")
public class Usuario extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Usuario() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		UsuarioDAO dao = new UsuarioDAO();
		
		if(request.getParameter("insertar")!=null) {
			
			long cedula;
			String email, nombre, password, usuario;
			
			cedula = Long.parseLong(request.getParameter("cedula"));
			email = request.getParameter("email");
			nombre = request.getParameter("nombre");
			usuario = request.getParameter("usuario");
			password = request.getParameter("password");
			
			UsuarioDTO dto = new UsuarioDTO(cedula, email, nombre, usuario, password);
			
			if(dao.insertarUsuario(dto)) {
				response.sendRedirect("usuarios.jsp?msj=Se ha registrado correctamente al usuario");
			}else {
				response.sendRedirect("usuarios.jsp?msj=No se pudo registrar al usuario");
			}
		}
		
		if(request.getParameter("borrar")!=null) {
			long cedula;
			cedula = Long.parseLong(request.getParameter("cedula"));
			UsuarioDTO usuario = null;
			try {
				usuario = dao.obtenerPorCedula(cedula);
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if(dao.eliminarUsuario(usuario)) {
				response.sendRedirect("usuarios.jsp?msj=Se ha eliminado al usuario");
			}else {
				response.sendRedirect("usuarios.jsp?msj=Ocurrio un error");
			}
		}
		
	}

}
