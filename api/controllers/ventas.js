const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const ventas = require('../models').ventas;
const productos = require('../models').producto;
const usuarios = require('../models').usuario;

module.exports = {
	/**
	 * Create a new ventas
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	create(req, res) {
		return ventas
			.create({
				detalle: req.body.detalle
			})
			.then(ventas => res.status(200).send(ventas))
			.catch(error => res.status(400).send(error))
	},

	/**
	 * List of ventass
	 * 
	 * @param {*} _ 
	 * @param {*} res 
	 */
	list(_, res) {
		return ventas
			.findAll({
			})
			.then(ventas => res.status(200).send(ventas))
			.catch(error => res.status(400).send(error))
	}

}