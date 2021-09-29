package controlador;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexion {
	private String bd="tiendagenerica";
	private String url="jdbc:mysql://localhost:3306/"+bd;
	private String user="root";
	private String pass="Salo2021.";
	Connection conn = null;
	
	public Connection Conecta() {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
			conn = DriverManager.getConnection(url,user,pass);
			//JOptionPane.showMessageDialog(null, "Conexión con BD exitosa");
		}catch(Exception e) {
			//JOptionPane.showMessageDialog(null, "Error en la conexión: "+e);
		}
		return conn;
	}
}
