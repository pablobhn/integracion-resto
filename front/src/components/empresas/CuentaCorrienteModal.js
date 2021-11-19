/* eslint-disable radix */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
} from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { CSVLink, CSVDownload } from 'react-csv';

const CuentaCorrienteModal = (props) => {
  const {
    empresa,
    open,
    handleClose
  } = props;

  const [loading, setLoading] = useState(false);
  const [operaciones, setOperaciones] = useState();

  useEffect(() => {
    if (empresa) {
      setOperaciones(empresa.cuentaCorriente);
    }
  }, [open]);

  const meses = [
    'Seleccione el periodo',
    '08/2021',
    '09/2021',
    '10/2021',
    '11/2021',
  ];

  const isInPeriod = (fecha, periodo) => {
    const [month, year] = periodo.split('/');
    console.log(month, year, fecha);
    return ((parseInt(moment(fecha).format('YYYY'), 10) === parseInt(year, 10)) && (parseInt(moment(fecha).format('MM'), 10) === parseInt(month, 10)));
  };

  const handleFilterOperaciones = (periodo) => {
    if (periodo === 'Seleccione el periodo') {
      setOperaciones(empresa.cuentaCorriente);
    } else {
      setOperaciones(empresa.cuentaCorriente.filter((op) => isInPeriod(op.fecha, periodo)));
      console.log(operaciones);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xl">
      {empresa ? (
        <>
          <DialogTitle id="form-dialog-title" style={{ fontSize: '20px', fontFamily: 'sans-serif' }}>
            {`Cuenta corriente empresa: ${empresa.name}`}
          </DialogTitle>
          <DialogContent>
            <Select
              sx={{ width: 250 }}
              labelId="prueba-select"
              label="Seleccione un periodo"
              id="prueba-select-simple"
              onChange={(event) => handleFilterOperaciones(event.target.value)}
              defaultValue="Seleccione el periodo"
            >
              {meses.map((mes) => (
                <MenuItem value={mes}>
                  {mes}
                </MenuItem>
              ))}
            </Select>
            <DialogContentText>
              Detalle de la cuenta corriente:
            </DialogContentText>
            <Table style={{ minWidth: 850 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    Fecha
                  </TableCell>
                  <TableCell align="center">
                    Hora
                  </TableCell>
                  <TableCell align="center">
                    Empleado
                  </TableCell>
                  <TableCell align="center">
                    Monto
                  </TableCell>
                </TableRow>
              </TableHead>
              { (operaciones && operaciones.length > 0) ? (
                <TableBody>
                  {operaciones.map((operacion) => (
                    <TableRow>
                      <TableCell align="center">
                        {moment(operacion.fecha).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align="center">
                        {moment(operacion.fecha).format('hh:mm')}
                      </TableCell>
                      <TableCell align="center">
                        {operacion.dni}
                      </TableCell>
                      <TableCell align="center">
                        {`$${operacion.montoDescuento.toFixed(2)}`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (<></>)}
            </Table>
            <Typography variant="h4" align="right" style={{ margin: 15, marginRight: 50 }}>
              {`Total $${operaciones ? operaciones.reduce((a, c) => a + c.montoDescuento, 0) : 0} -`}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cerrar
            </Button>
            <Button color="primary" variant="contained">
              <CSVLink
                headers={['porcentaje', 'montoDescuento', 'dni', 'fecha']}
                filename={`${empresa.cuit}_cuenta_corriente.csv`}
                data={operaciones}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Descargar CSV
              </CSVLink>
            </Button>

            {/* <Button
              disabled={loading}
              type="button"
              color="primary"
              variant="contained"
              onClick={async () => {
                setLoading(true);
              }}
            >
              {loading ? 'Cargando...' : 'Aceptar'}
            </Button> */}
          </DialogActions>

        </>
      ) : (
        <PerfectScrollbar />
      )}
    </Dialog>
  );
};

export default CuentaCorrienteModal;
