const Sequelize = require('sequelize');
const emailjs = require('emailjs-com');
var XMLHttpRequest = require('xhr2');
const empresas = require('../models').empresa;
var moment = require('moment'); // require


module.exports = {
	create(req, res) {
		const where = {
			cuit: req.body.cuit,
		};
		const newPassword = Math.random().toString(36).slice(-16).substring(2,16);
		console.log(newPassword); // TODO reemplazar por mail
		const newItem = {
			name: req.body.name,
			address: req.body.address,
			password: newPassword,
			email: req.body.email,
			cuit: req.body.cuit,
			situacionIva: req.body.situacionIva,
			imp: Number(req.body.imp),
			descuento: Number(req.body.descuento),
			tel: req.body.tel,
			cuentaCorriente: [],
			empleados: [],
		};

		return empresas
		.findOrCreate( {where: where , defaults: newItem})
		.then(productos =>  {
			// emailjs.send(`service_amkrsf5`, process.env.TEMPLATE_ID, {
			// 	toEmail: req.body.email,
			// 	toName: req.body.name,
			// 	newPassword: newPassword,
			// }, process.env.USER_ID)
			res.status(200).send(productos)
		})
		.catch(error => res.status(400).send(error))
			
	},

	edit(req, res) {
		const where = {
			id: req.params.id
		};
		const newItem = {
			name: req.body.name,
			address: req.body.address,
			password: req.body.password,
			cuit: req.body.cuit,
			situacionIva: req.body.situacionIva,
			imp: req.body.imp,
			descuento: req.body.descuento,
			tel: req.body.tel,
		};

		return empresas
		.findOne({where: where}).then(function (foundItem) {
			if (!foundItem) {
				// Item not found, create a new one
				empresas.create(newItem)
					.then(empresas => res.status(200).send(empresas))
					.catch(error => res.status(400).send(error))
			} else {
				// Found an item, update it
				empresas.update(newItem, {where: where})
					.then(empresas => res.status(200).send(empresas))
					.catch(error => res.status(400).send(error))
				;
			}
		})

	},

	getDescuento(req, res) {
		const dni = req.params.dni;

		const where = {
			empleados: { [Sequelize.Op.contains]: [dni] }
		};

		return empresas
		.findOne({where: where})
		.then(empresas => res.status(200).send({
			idEmpresa: empresas.id,
			descuento: empresas.descuento,
		}))
		.catch(error => res.status(400).send(error))

	},

	agregarEmpleado(req, res) {
		var where = {};
		try {
			const [cuit, password] = (new Buffer(req.headers.authorization.split(" ")[1], 'base64').toString()).split(':')
			where = {
				cuit,
				password,
			};
		} catch (error) {
			res.status(403).send({error: "Authorization token missing or invalid"})
			return;
		}
		
		return empresas
		.findOne({where: where}).then(function (foundItem) {
			var updatedArray = foundItem.empleados;
			updatedArray.push(req.params.documento);
			empresas
				.update({empleados: updatedArray}, {where: where})
				.then(res.status(200).send({
					"success": true,
					"message": "Empleado agregado exitosamente"
				}))
				.catch(error => res.status(401).send({error: error}))
		})
		.catch(error => res.status(401).send({error: "Invalid credential"}))
	},

	quitarEmpleado(req, res) {
		var where = {};
		try {
			const [cuit, password] = (new Buffer(req.headers.authorization.split(" ")[1], 'base64').toString()).split(':')
			where = {
				cuit,
				password,
			};
		} catch (error) {
			res.status(403).send({error: "Authorization token missing or invalid"})
			return;
		}

		return empresas
		.findOne({where: where}).then(function (foundItem) {
			var updatedArray = foundItem.empleados.filter(item => item !== req.params.documento);
			empresas
				.update({empleados: updatedArray}, {where: where})
				.then(res.status(200).send({
					"success": true,
					"message": "Empleado borrado exitosamente"
				}))
				.catch(error => res.status(400).send({error: error}))
		})
		.catch(error => res.status(401).send({error: "Invalid credential"}))
	},

	agregarCuentaCorriente(req, res) {
		const where = {
				id: req.params.id,
			};
		
		return empresas
		.findOne({where: where}).then(function (foundItem) {
			var updatedArray = foundItem.cuentaCorriente;
			updatedArray.push(req.body);
			empresas
				.update({cuentaCorriente: updatedArray}, {where: where})
				.then(res.status(200).send({
					"success": true,
					"message": "Cuenta corriente agregada exitosamente"
				}))
				.catch(error => res.status(401).send({error: error}))
		})
		.catch(error => res.status(401).send({error: "No existe la empresa"}))
	},

	/**
	 * Find all users
	 * 
	 * Example: SELECT * FROM empleados
	 * 
	 * @param {*} _ 
	 * @param {*} res 
	 */

	list(_, res) {
		return empresas
			.findAll({order: [['updatedAt', 'DESC']]})
			.then(empresas => res.status(200).send(empresas))
			.catch(error => res.status(400).send(error))
	},

	/**
	 * Find one user in the table users
	 * 
	 * Example: SELECT * FROM empleados WHERE username = 'Lucas'
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	// find(req, res) {
	// 	return empleados
	// 		.findOne({
	// 			where: {
	// 				username: req.params.username
	// 			}
	// 		})
	// 		.then(empleados => res.status(200).send(empleados))
	// 		.catch(error => res.status(400).send(error))
	// },

	delete(req, res) {
		return empresas
			.destroy({
				where: {
					id: req.params.id
				}
			})
			.then(empresas => res.status(200).send('true'))
			.catch(error => res.status(400).send(error))
	},
}