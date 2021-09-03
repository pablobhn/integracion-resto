const Sequelize = require('sequelize');
const productos = require('../models').producto;

module.exports = {

	/**
	 * Create a new user validate before if not exists
	 * 
	 * Example: INSERT INTO productos (username, status) VALUES ("lucas", "1");
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	create(req, res) {
		const where = {
			title: req.body.title
		};
		const newItem = {
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			imgSrc: req.body.imgSrc,
			avatarUrl: req.body.avatarUrl,
			type: req.body.type,
			sinTac: req.body.sinTac,
			vegano: req.body.vegano,
			qty: req.body.qty
		};

		return productos
			.findOrCreate({ where: where , defaults: newItem})
			.then(productos => res.status(200).send(productos))
			.catch(error => res.status(400).send(error))

			
	},

	edit(req, res) {
		const where = {
			id: req.params.id
		};
		const newItem = {
			title: req.body.title,
			description: req.body.description,
			price: req.body.price,
			imgSrc: req.body.imgSrc,
			avatarUrl: req.body.avatarUrl,
			type: req.body.type,
			sinTac: req.body.sinTac,
			vegano: req.body.vegano,
			qty: req.body.qty
		};

		return productos
		.findOne({where: where}).then(function (foundItem) {
			if (!foundItem) {
				// Item not found, create a new one
				productos.create(newItem)
					.then(productos => res.status(200).send(productos))
					.catch(error => res.status(400).send(error))
			} else {
				// Found an item, update it
				productos.update(newItem, {where: where})
					.then(productos => res.status(200).send(productos))
					.catch(error => res.status(400).send(error))
				;
			}
		})

	},

	/**
	 * Find all users
	 * 
	 * Example: SELECT * FROM productos
	 * 
	 * @param {*} _ 
	 * @param {*} res 
	 */

	list(_, res) {
		return productos
			.findAll({})
			.then(productos => res.status(200).send(productos))
			.catch(error => res.status(400).send(error))
	},

	/**
	 * Find one user in the table users
	 * 
	 * Example: SELECT * FROM productos WHERE username = 'Lucas'
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	// find(req, res) {
	// 	return productos
	// 		.findOne({
	// 			where: {
	// 				username: req.params.username
	// 			}
	// 		})
	// 		.then(productos => res.status(200).send(productos))
	// 		.catch(error => res.status(400).send(error))
	// },

	delete(req, res) {
		return productos
			.destroy({
				where: {
					id: req.params.id
				}
			})
			.then(productos => res.status(200).send('true'))
			.catch(error => res.status(400).send(error))
	}
}