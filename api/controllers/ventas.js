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
				mesa: req.body.mesa,
				estado: 0,
				pago: req.body.pago,
				detalle: req.body.detalle
			})
			.then(ventas => res.status(200).send(ventas))
			.catch(error => res.status(400).send(error))
	},

	updateStatus(req,res){
		return ventas
			.update(
				{
					estado: req.body.nuevoEstado
				},
				{ where: { id: req.params.id} }
			)
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
			.findAll({order: [['createdAt', 'DESC']]})
			.then(ventas => res.status(200).send(ventas))
			.catch(error => res.status(400).send(error))
	}

}