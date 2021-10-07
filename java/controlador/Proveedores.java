package controlador;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import modelo.ProveedorDAO;
import modelo.ProveedorDTO;

/**
 * Servlet implementation class proveedores
 */
@WebServlet("/Proveedor")
public class Proveedor extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Proveedor() {
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
		
		ProveedorDAO uDAO= new ProveedorDAO();
		Gson json=new Gson();
		PrintWriter salida= response.getWriter();
		
		/**
		 * Insertar Proveedor
		 */
		if(request.getParameter("insertar")!=null) {
			
			long nit_proveedor;
			String ciudad_proveedor, direccion_proveedor, nombre_proveedor, telefono_proveedor, respuesta;
			
			nit_proveedor = Long.parseLong(request.getParameter("nit_proveedor"));
			ciudad_proveedor = request.getParameter("ciudad_proveedor");
			direccion_proveedor = request.getParameter("direccion_proveedor");
			nombre_proveedor = request.getParameter("nombre_proveedor");
			telefono_proveedor = request.getParameter("telefono_proveedor");
			
			ProveedorDTO dto = new ProveedorDTO(nit_proveedor, ciudad_proveedor, direccion_proveedor, nombre_proveedor, telefono_proveedor);
			
			if(uDAO.insertarProveedor(dto)) {
				respuesta = "[{\"estado\":\"Ok\"}]";
				salida.println(respuesta);	
			}else {
				respuesta = "[{\"estado\":\"Error\"}]";
			}
		}
		
		/**
		 * Editar Proveedor
		 */
		if(request.getParameter("editar")!=null) {
			
			long nit_proveedor;
			String ciudad_proveedor, direccion_proveedor, nombre_proveedor, telefono_proveedor, respuesta;
			
			nit_proveedor = Long.parseLong(request.getParameter("nit_proveedor"));
			ciudad_proveedor = request.getParameter("ciudad_proveedor");
			direccion_proveedor = request.getParameter("direccion_proveedor");
			nombre_proveedor = request.getParameter("nombre_proveedor");
			telefono_proveedor = request.getParameter("telefono_proveedor");
			
			ProveedorDTO dto = new ProveedorDTO(nit_proveedor, ciudad_proveedor, direccion_proveedor, nombre_proveedor, telefono_proveedor);
			
			if(uDAO.actualizarProveedor(dto)) {
				respuesta = "[{\"estado\":\"Ok\"}]";
				salida.println(respuesta);	
			}else {
				respuesta = "[{\"estado\":\"Error\"}]";
			}
		}
		
		/**
		 * Borrar Proveedor
		 */
		if(request.getParameter("borrar")!=null) {
			
			long nit_proveedor;
			String respuesta;
			
			nit_proveedor = Long.parseLong(request.getParameter("nit_proveedor"));
			ProveedorDTO nombre_proveedor = null;
			nit_proveedor = uDAO.obtenerPorNitProveedor(nitProveedor)
			if(uDAO.eliminarProveedor(nit_proveedor)) {
				respuesta = "[{\"estado\":\"Ok\"}]";
				salida.println(respuesta);	
			}else {
				respuesta = "[{\"estado\":\"Error\"}]";
			}
		}	
		
		/**
		 * Ver proveedor
		 */
		if(request.getParameter("ver")!=null) {
			
			long nit_proveedor;
			String respuesta;
			
			nit_proveedor = Long.parseLong(request.getParameter("nit_proveedor"));
			ProveedorDTO nit_proveedor = null;
			nit_proveedor = uDAO.obtenerPorNitProveedor(nitProveedor)
			if(nit_proveedor != null) {
				salida.println(json.toJson(nit_proveedor));
			}else {
				respuesta = "[{\"estado\":\"Error\"}]";
				salida.println(respuesta);
			}
		}
		
		/**
		 * Convertir lista en formato JSON
		 */
		if(request.getParameter("listar")!=null) {
			ArrayList<ProveedorDTO> lista=new ArrayList<>();
			lista=uDAO.listarProveedores();
			salida.println(json.toJson(lista));	
		}

	}

}
