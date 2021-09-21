// Controllers
const usuariosController = require('../controllers/usuarios');
const productosController = require('../controllers/productos');
const empleadosController = require('../controllers/empleados');
const ventasController = require('../controllers/ventas');

module.exports = (app) => {

	app.get('/api', (req, res) => res.status(200).send({
		message: 'test response',
	}));

	// Routes of Web Services
	// Users
	app.post('/api/usuarios/create', usuariosController.create);
	app.get('/api/usuarios/list', usuariosController.list);
	// app.get('/api/usuarios/find/username/:username', usuariosController.find);
	app.post('/api/usuarios/login', usuariosController.login);
	app.post('/api/usuarios/edit/username/:username', usuariosController.edit);
	app.post('/api/usuarios/delete/username/:username', usuariosController.delete);

	// Productos
	app.post('/api/productos/create', productosController.create);
	app.get('/api/productos/list', productosController.list);
	app.get('/api/productos/list/id/:id', productosController.find);
	// app.get('/api/productos/find/id/:id', productosController.find);
	app.post('/api/productos/edit/id/:id', productosController.edit);
	app.post('/api/productos/delete/id/:id', productosController.delete);

	// Ventas
	app.post('/api/ventas/create', ventasController.create);
	app.post('/api/ventas/updateStatus/id/:id', ventasController.updateStatus);
	app.get('/api/ventas/list', ventasController.list);
	

	// Productos
	app.post('/api/empleados/create', empleadosController.create);
	app.get('/api/empleados/list', empleadosController.list);
	app.post('/api/empleados/edit/id/:id', empleadosController.edit);
	app.post('/api/empleados/delete/id/:id', empleadosController.delete);
	app.post('/api/empleados/horasExtra/id/:id', empleadosController.horasExtra);
	app.post('/api/empleados/faltas/id/:id', empleadosController.faltas);

};