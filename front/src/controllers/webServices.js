const urlApi = process.env.REACT_APP_API_URL;

const urlWebServices = {
  login: `${urlApi}api/usuarios/login`,
  crearProducto: `${urlApi}api/productos/create`,
  listarProductos: `${urlApi}api/productos/list`,
  editarProducto: `${urlApi}api/productos/edit/id/`,
  borrarProducto: `${urlApi}api/productos/delete/id/`,
  crearVenta: `${urlApi}api/ventas/create`,
  listarVentas: `${urlApi}api/ventas/list`,
  listarLiquidaciones: `${urlApi}api/liquidaciones/list`,
  listarEmpleados: `${urlApi}api/empleados/list`,
  empleadosHorasExtra: `${urlApi}api/empleados/horasExtra`,
  empleadosFaltas: `${urlApi}api/empleados/faltas`,
  actualizarEstadoVenta: `${urlApi}api/ventas/updateStatus/id/`,
  actualizarPago: `${urlApi}api/ventas/actualizarPago/id/`,
  actualizarEstadoLiquidacion: `${urlApi}api/liquidaciones/updateStatus/id/`,
  crearEmpleado: `${urlApi}api/empleados/create`,
  editarEmpleado: `${urlApi}api/empleados/edit/id/`,
  liquidarSueldo: `${urlApi}api/empleados/liquidarSueldo/id/`,
  crearEmpresa: `${urlApi}api/empresas/create`,
  editarEmpresa: `${urlApi}api/empresas/edit/id/`,
  getDescuento: `${urlApi}api/empresas/getDescuento/`,
  listarEmpresas: `${urlApi}api/empresas/list`,
  agregarCuentaCorriente: `${urlApi}api/empresas/agregarCuentaCorriente/id/`,
  pagoTarjeta: 'https://ia-grupo4-backend.herokuapp.com/api/users/agregarMovimiento'

// register: urlApi + "api/usuarios/create",
// findUser: urlApi + "api/usuarios/find/username/",
// listProductos: urlApi + "api/productos/list",
// listVentas: urlApi + "api/ventas/list",
// crearProducto: urlApi + "api/productos/create",
// deleteProducto: urlApi + "api/productos/delete/id",
// crearVenta: urlApi + "api/ventas/create",
// addFavoritos:urlApi + "api/usuarios/addfav/username",
// rmvFavoritos:urlApi + "api/usuarios/rmfav/username",
};

export default urlWebServices;
