/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
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
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xl">
      {empresa ? (
        <>
          <DialogTitle id="form-dialog-title" style={{ fontSize: '20px', fontFamily: 'sans-serif' }}>
            {`Cuenta corriente empresa: ${empresa.name}`}
          </DialogTitle>
          <DialogContent>
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
              { (empresa.cuentaCorriente.length > 0) ? (
                <TableBody>
                  {empresa.cuentaCorriente.map((operacion) => (
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
              {`Total $${empresa.cuentaCorriente.reduce((a, c) => a + c.montoDescuento, 0)} -`}
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
                data={empresa.cuentaCorriente}
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
