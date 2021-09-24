const Sequelize = require('sequelize');
const empleados = require('../models').empleado;
const liquidaciones = require('../models').liquidaciones;
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
			horasBase: req.body.horasBase,
			horasExtra: [],
			faltas: []
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
			horasBase: req.body.horasBase
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

	horasExtra(req, res) {
		const where = {
			id: req.params.id
		};

		const data = {
			fecha: req.body.fecha,
			horas: req.body.horas
		};

		return empleados
		.findOne({where: where}).then(function (foundItem) {
			var updatedArray = foundItem.horasExtra;
			updatedArray.push(data);
			empleados
				.update({'horasExtra': updatedArray}, {where: where})
				.then(empleados => res.status(200).send(empleados))
				.catch(error => res.status(400).send(error))
		})
	},

	faltas(req, res) {
		const where = {
			id: req.params.id
		};

		const data = {
			fecha: req.body.fecha,
			horas: req.body.horas
		};

		return empleados
		.findOne({where: where}).then(function (foundItem) {
			var updatedArray = foundItem.faltas;
			updatedArray.push(data);
			empleados
				.update({'faltas': updatedArray}, {where: where})
				.then(empleados => res.status(200).send(empleados))
				.catch(error => res.status(400).send(error))
		})
	},

	liquidarSueldo(req, res) {
		const where = {
			id: req.params.id
		};

		return empleados
		.findOne({where: where}).then(function (empleado) {
			const month = parseInt(req.params.month);
			const year = parseInt(req.params.year);
			const basico = empleado.rate;
			const fechaActual = new Date();
			const antiguedadDif = fechaActual - moment(empleado.fechaIngreso)
			const antiguedadDate = new Date(antiguedadDif);
			const antiguedad = (Math.abs(antiguedadDate.getUTCFullYear() - 1970)) >= 1 ? (Math.abs(antiguedadDate.getUTCFullYear() - 1970)) : 0;
			const jubilacion = 0.11;
			const obraSocial = 0.03;
			const ley19032 = 0.03;
			const sindicato = 0.025;

			const isSamePeriod = (fecha) => {			
				return ((parseInt(moment(fecha).format('YYYY'), 10) === year) && (parseInt(moment(fecha).format('MM'), 10) === month));
			};

			const faltasMes = empleado.horasExtra.reduce((a, c) => a + (isSamePeriod(c.fecha) ? c.horas : 0), 0);
			const extrasMes = empleado.faltas.reduce((a, c) => a + (isSamePeriod(c.fecha) ? c.horas : 0), 0);
			
			const bruto = basico - (faltasMes * (empleado.rate/160)) + (antiguedad * empleado.rate) + (extrasMes * empleado.rate / empleado.horasBase);
			const total = bruto * (1 - jubilacion - obraSocial - ley19032 - sindicato);

			const detalle = [
				{
					descripcion: `Sueldo básico ${empleado.role}`,
					cantidad: 160, 
					monto: basico
				},
				{
					descripcion: "Antiguedad",
					cantidad: antiguedad,
					monto: (antiguedad * empleado.rate * 0.02)
				},
				{
					descripcion: "Horas extra",
					cantidad: extrasMes,
					monto: extrasMes * empleado.rate / empleado.horasBase
				},
				{
					descripcion: "Faltas injustificadas",
					cantidad: faltasMes,
					monto: -(faltasMes * empleado.rate / empleado.horasBase)
				},
				{
					descripcion: "Jubilacion",
					cantidad: 1,
					monto: -(jubilacion * bruto)
				},
				{
					descripcion: "Obra social",
					cantidad: 1,
					monto: -(obraSocial * bruto)
				},
				{
					descripcion: "Ley 19.032 Seg. social",
					cantidad: 1,
					monto: -(ley19032 * bruto)
				},
				{
					descripcion: "Cuota sindical",
					cantidad: 1,
					monto: -(sindicato * bruto)
				}
			];

			const newLiquidacion = {
                status: 0,
                periodo: `${year}-${month}-01`,
                legajo: empleado.id,
				empleado: empleado.name,
                total: total,
                detalle: detalle,
                pago: {}
			};

			liquidaciones.create(newLiquidacion)
				.then(liquidaciones => res.status(200).send(liquidaciones))
				.catch(error => res.status(400).send(error))

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
	},
}