const Sequelize = require('sequelize');
const empresas = require('../models').empresa;
var moment = require('moment'); // require

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
		};
		const newItem = {
			name: req.body.name,
			address: req.body.address,
			cuit: req.body.cuit,
			situacionIva: req.body.situacionIva,
			imp: req.body.imp,
			tel: req.body.tel,
			fechaIngreso: req.body.fechaIngreso,
		};

		return empresas
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
			address: req.body.address,
			cuit: req.body.cuit,
			situacionIva: req.body.situacionIva,
			imp: req.body.imp,
			tel: req.body.tel,
			fechaIngreso: req.body.fechaIngreso,
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