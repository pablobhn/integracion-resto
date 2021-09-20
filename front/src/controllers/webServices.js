const urlApi = 'http://localhost:8000/';

const urlWebServices = {
  login: `${urlApi}api/usuarios/login`,
  crearProducto: `${urlApi}api/productos/create`,
  listarProductos: `${urlApi}api/productos/list`,
  editarProducto: `${urlApi}api/productos/edit/id/`,
  borrarProducto: `${urlApi}api/productos/delete/id/`

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