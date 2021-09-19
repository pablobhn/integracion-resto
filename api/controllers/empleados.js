const Sequelize = require('sequelize');
const empleados = require('../models').empleado;

module.exports = {

	/**
	 * Create a new user validate before if not exists
	 * 
	 * Example: INSERT INTO empleados (username, status) VALUES ("lucas", "1");
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	create(req, res) {
		const where = {
			name: req.body.name,
			fechaNacimiento: req.body.fechaNacimiento
		};
		const newItem = {
			name: req.body.name,
			role: req.body.role,
			address: req.body.address,
			tel: req.body.tel,
			status: req.body.status,
			fechaNacimiento: req.body.fechaNacimiento,
			fechaIngreso: req.body.fechaIngreso,
			rate: req.body.rate,
			horasExtra: req.body.horasExtra,
			faltas: req.body.faltas
		};

		return empleados
		.findOrCreate( {where: where , defaults: newItem})
		.then(productos => res.status(200).send(productos))
		.catch(error => res.status(400).send(error))

			
	},

	edit(req, res) {
		const where = {
			id: req.params.id
		};
		const newItem = {
			name: req.body.name,
			role: req.body.role,
			address: req.body.address,
			tel: req.body.tel,
			status: req.body.status,
			fechaNacimiento: req.body.fechaNacimiento,
			fechaIngreso: req.body.fechaIngreso,
			rate: req.body.rate,
			horasBase: req.body.horasBase,
			horasExtra: req.body.horasExtra,
			faltas: []
		};

		return empleados
		.findOne({where: where}).then(function (foundItem) {
			if (!foundItem) {
				// Item not found, create a new one
				empleados.create(newItem)
					.then(empleados => res.status(200).send(empleados))
					.catch(error => res.status(400).send(error))
			} else {
				// Found an item, update it
				empleados.update(newItem, {where: where})
					.then(empleados => res.status(200).send(empleados))
					.catch(error => res.status(400).send(error))
				;
			}
		})

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
		return empleados
			.findAll({order: [['updatedAt', 'DESC']]})
			.then(empleados => res.status(200).send(empleados))
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
		return empleados
			.destroy({
				where: {
					id: req.params.id
				}
			})
			.then(empleados => res.status(200).send('true'))
			.catch(error => res.status(400).send(error))
	}
}