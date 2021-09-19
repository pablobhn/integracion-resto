const Sequelize = require('sequelize');
const usuarios = require('../models').usuario;

module.exports = {

	/**
	 * Create a new user validate before if not exists
	 * 
	 * Example: INSERT INTO usuarios (username, status) VALUES ("lucas", "1");
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	create(req, res) {
		return usuarios
			.findOrCreate({
				where: {
					username: req.body.username,
					name: req.body.name,
					password: req.body.password,
					role: req.body.role
				},
				username: req.body.username
			})
			.then(usuarios => res.status(200).send(usuarios))
			.catch(error => res.status(400).send(error))
	},

	/**
	 * Find all users
	 * 
	 * Example: SELECT * FROM usuarios
	 * 
	 * @param {*} _ 
	 * @param {*} res 
	 */

	list(_, res) {
		return usuarios
			.findAll({})
			.then(usuarios => res.status(200).send(usuarios))
			.catch(error => res.status(400).send(error))
	},

	/**
	 * Find one user in the table users
	 * 
	 * Example: SELECT * FROM usuarios WHERE username = 'Lucas'
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	// find(req, res) {
	// 	return usuarios
	// 		.findOne({
	// 			where: {
	// 				username: req.params.username
	// 			}
	// 		})
	// 		.then(usuarios => res.status(200).send(usuarios))
	// 		.catch(error => res.status(400).send(error))
	// },

	login(req, res) {
		return usuarios
			.findOne({
				where: {
					username: req.body.username,
					password: req.body.password
				}
			})
			.then(usuarios => {
				const token = Buffer.from(usuarios.username+'-'+usuarios.name+'-'+usuarios.role).toString('base64');
				res.status(200).json({token})
			})
			.catch(error => res.status(400).send(error))
	},
	
	edit(req, res) {
		const where = {
			username: req.params.username
		};
		const newItem = {
			username: req.body.username,
			name: req.body.name,
			password: req.body.password,
			role: req.body.role
		};

		return usuarios
		.findOne({where: where}).then(function (foundItem) {
			if (!foundItem) {
				// Item not found, create a new one
				usuarios.create(newItem)
					.then(usuarios => res.status(200).send(usuarios))
					.catch(error => res.status(400).send(error))
			} else {
				// Found an item, update it
				usuarios.update(newItem, {where: where})
					.then(usuarios => res.status(200).send(usuarios))
					.catch(error => res.status(400).send(error))
				;
			}
		})

	},

	delete(req, res) {
		return usuarios
			.destroy({
				where: {
					username: req.params.username
				}
			})
			.then(usuarios => res.status(200).send('true'))
			.catch(error => res.status(400).send(error))
	}
}