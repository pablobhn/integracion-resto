const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const liquidaciones = require('../models').liquidaciones;
const productos = require('../models').producto;
const usuarios = require('../models').usuario;

module.exports = {
	/**
	 * Create a new liquidaciones
	 * 
	 * @param {*} req 
	 * @param {*} res 
	 */
	create(req, res) {
		return liquidaciones
			.create({
                status: 0,
                periodo: req.body.periodo,
                empleado: req.body.empleado,
                legajo: req.body.legajo,
                total: req.body.total,
                detalle: req.body.detalle,
                pago: {}
			})
			.then(liquidaciones => res.status(200).send(liquidaciones))
			.catch(error => res.status(400).send(error))
	},

	updateStatus(req,res){
		return liquidaciones
			.update(
				{
					status: req.body.nuevoEstado
				},
				{ where: { id: req.params.id} }
			)
			.then(liquidaciones => res.status(200).send(liquidaciones))
			.catch(error => res.status(400).send(error))
	},

	/**
	 * List of liquidacioness
	 * 
	 * @param {*} _ 
	 * @param {*} res 
	 */
	list(_, res) {
		return liquidaciones
			.findAll({order: [['createdAt', 'DESC']]})
			.then(liquidaciones => res.status(200).send(liquidaciones))
			.catch(error => res.status(400).send(error))
	}

}