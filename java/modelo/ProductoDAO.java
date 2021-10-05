package modelo;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import controlador.Conexion;

public class ProductoDAO {
	
	Conexion conn = new Conexion();
	Connection connect = conn.Conecta();
	PreparedStatement ps = null;
	ResultSet rs = null;
	
	/**
	 * Funcion para insertar productos en DB
	 * @param dto
	 * @return
	 */
	public boolean insertarProducto(ProductoDTO dto) {
		boolean result = false;
		try {
			String sql = "INSERT INTO producto VALUES(?,?,?,?,?,?)";
			ps = connect.prepareStatement(sql);
			ps.setLong(1, dto.getCodigoProducto());
			ps.setDouble(2, dto.getIvaCompra());
			ps.setLong(3, dto.getNitProveedor());
			ps.setString(4, dto.getNombreProducto());
			ps.setDouble(5, dto.getPrecioCompra());
			ps.setDouble(6, dto.getPrecioVenta());
			result = ps.executeUpdate()>0;
		}catch(SQLException e){
			e.printStackTrace();
		}
		return result;	
	}
	
	/**
	 * Funcion para listar productos desde la DB
	 * @return
	 * @throws SQLException
	 */
	public List<ProductoDTO> listarProductos() throws SQLException {
		
		List<ProductoDTO> listaProductos = new ArrayList<ProductoDTO>();
		String sql = "SELECT * FROM producto";
		ps = connect.prepareStatement(sql);
		rs = ps.executeQuery();
 
		while (rs.next()) {
			long codigoProducto = rs.getLong("codigo_producto");
			double ivaCompra = rs.getDouble("iva_compra");
			long nitProveedor = rs.getLong("nit_proveedor");
			String nombreProducto = rs.getString("nombre_producto");
			double precioCompra = rs.getDouble("precio_compra");
			double precioVenta = rs.getDouble("precio_venta");
			ProductoDTO pDTO = new ProductoDTO(codigoProducto, ivaCompra, nitProveedor, nombreProducto, precioCompra, precioVenta);
			listaProductos.add(pDTO);
		}
		
		return listaProductos;
	}
	
	/**
	 * Funcion para buscar por codigo de producto
	 * @param cedula
	 * @return
	 * @throws SQLException
	 */
	public ProductoDTO obtenerPorCodigo(long codigoProducto) throws SQLException{
		
		ProductoDTO producto = null;
 
		String sql = "SELECT * FROM producto WHERE codigo_producto = ? ";
		ps = connect.prepareStatement(sql);
		ps.setLong(1, codigoProducto);
		rs = ps.executeQuery();
 
		if (rs.next()) {
			producto = new ProductoDTO(
					rs.getLong("codigo_producto"),
					rs.getDouble("iva_compra"),
					rs.getLong("nit_proveedor"),
					rs.getString("nombre_producto"),
					rs.getDouble("precio_compra"),
					rs.getDouble("precio_venta")
					);
		}
		return producto;
	}
	
	/**
	 * Funcion para eliminar producto
	 * @param dto
	 * @return
	 */
	public boolean eliminarProducto(ProductoDTO dto) {
		boolean result = false;
		try {
			String sql = "DELETE FROM producto WHERE codigo_producto=?";
			ps = connect.prepareStatement(sql);
			ps.setLong(1, dto.getCodigoProducto());
			result = ps.executeUpdate()>0;
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return result;
	}
	
}
