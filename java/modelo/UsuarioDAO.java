package modelo;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import controlador.Conexion;

public class UsuarioDAO {
	
	Conexion conn = new Conexion();
	Connection connect = conn.Conecta();
	PreparedStatement ps = null;
	ResultSet rs = null;
	
	/**
	 * Función para insertar Usuarios en DB
	 * @param dto
	 * @return true/false
	 */
	public boolean insertarUsuario(UsuarioDTO dto) {
		boolean result = false;
		try {
			String sql = "INSERT INTO usuario VALUES(?,?,?,?,?)";
			ps = connect.prepareStatement(sql);
			ps.setLong(1, dto.getCedulaUsuario());
			ps.setString(2, dto.getEmailUsuario());
			ps.setString(3, dto.getNombreUsuario());
			ps.setString(4, dto.getPassword());
			ps.setString(5, dto.getUsuario());
			result = ps.executeUpdate()>0;
		}catch(SQLException e){
			e.printStackTrace();
		}
		return result;	
	}
	
	/**
	 * Función para listar Usuarios desde BD
	 * @return Lista
	 * @throws SQLException
	 */
	public List<UsuarioDTO> listarUsuarios() throws SQLException {
		
		List<UsuarioDTO> listaUsuarios = new ArrayList<UsuarioDTO>();
		String sql = "SELECT * FROM usuario";
		ps = connect.prepareStatement(sql);
		rs = ps.executeQuery();
 
		while (rs.next()) {
			long cedula = rs.getLong("cedula_usuario");
			String email = rs.getString("email_usuario");
			String nombre = rs.getString("nombre_usuario");
			String password = rs.getString("password");
			String usuario = rs.getString("usuario");
			UsuarioDTO uDTO = new UsuarioDTO(cedula, email, nombre, usuario, password);
			listaUsuarios.add(uDTO);
		}
		
		return listaUsuarios;
	}
	
	/**
	 * Funcion para buscar usuario por cedula
	 * @param cedula
	 * @return UsuarioDTO
	 * @throws SQLException
	 */
	public UsuarioDTO obtenerPorCedula(long cedula) throws SQLException{
		UsuarioDTO usuario = null;
 
		String sql = "SELECT * FROM usuario WHERE cedula_usuario= ? ";
		ps = connect.prepareStatement(sql);
		ps.setLong(1, cedula);
		rs = ps.executeQuery();
 
		if (rs.next()) {
			usuario = new UsuarioDTO(
					rs.getLong("cedula_usuario"),
					rs.getString("email_usuario"),
					rs.getString("nombre_usuario"),
					rs.getString("password"),
					rs.getString("usuario")
					);
		}
		return usuario;
	}
	
	/**
	 * Funcion para eliminar usuario
	 * @param dto
	 * @return true/false
	 */
	public boolean eliminarUsuario(UsuarioDTO dto) {
		boolean result = false;
		try {
			String sql = "DELETE FROM usuario WHERE cedula_usuario=?";
			ps = connect.prepareStatement(sql);
			ps.setLong(1, dto.getCedulaUsuario());
			result = ps.executeUpdate()>0;
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	
	public UsuarioDTO loginUsuario(String u, String p) throws SQLException{
		UsuarioDTO usuario = null;
 
		String sql = "SELECT * FROM usuario WHERE usuario= ? AND password=?";
		ps = connect.prepareStatement(sql);
		ps.setString(1, u);
		ps.setString(2, p);
		rs = ps.executeQuery();
 
		if (rs.next()) {
			usuario = new UsuarioDTO(
					rs.getLong("cedula_usuario"),
					rs.getString("email_usuario"),
					rs.getString("nombre_usuario"),
					rs.getString("password"),
					rs.getString("usuario")
					);
		}
		return usuario;
	}
	
}
