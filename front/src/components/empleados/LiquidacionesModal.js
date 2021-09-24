/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import moment from 'moment';
import { Navigate } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField
} from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import { liquidarSueldo } from '../../controllers/empleados';

const LiquidacionesModal = (props) => {
  const {
    open,
    handleClose,
    selectedEmpleadosIds
  } = props;
  const [loading, setLoading] = React.useState(false);

  const initialValues = {
    mes: '',
    anio: ''
  };

  const validationSchema = yup.object({
    mes: yup
      .number('Ingrese el mes del periodo a liquidar')
      .min(parseInt(moment(new Date()).format('MM') - 3, 10), 'Solo se puede liquidar sueldos de los ultimos 3 períodos')
      .max((parseInt(moment(new Date()).format('MM'), 10)), 'Solo se puede liquidar sueldos de los ultimos 3 períodos')
      .required('El mes es requerido'),
    anio: yup
      .number('Ingrese el año del periodo a liquidar básico')
      .min(parseInt(moment(new Date()).format('YYYY'), 10), 'Solo se puede liquidar sueldos de los ultimos 3 períodos')
      .max((parseInt(moment(new Date()).format('YYYY'), 10)), 'Solo se puede liquidar sueldos de los ultimos 3 períodos')
      .required('El año es requerido'),
  });

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" disableTypography="true" style={{ fontSize: '30px', fontFamily: 'sans-serif' }}> Crear Empleado</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ingrese el periodo a liquidar
        </DialogContentText>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            setLoading(true);
            const responses = [Promise];
            selectedEmpleadosIds.map(async (id) => {
              responses.push(liquidarSueldo(id, values.anio, values.mes));
            });

            const res = await Promise.all(responses);
            if (res) {
              setLoading(false);
              alert('Se han liquidado los sueldos del período seleccionado');
              Navigate('/app/liquidaciones');
            } else {
              setLoading(false);
              alert('Ha habido un error al liquidar los sueldos');
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container>
                <Grid item xs="6" sx={{ p: 1 }}>
                  <TextField
                    fullWidth
                    id="mes"
                    name="mes"
                    label="Mes"
                    type="number"
                    value={values.mes}
                    onChange={handleChange}
                    error={touched.mes && Boolean(errors.mes)}
                    helperText={touched.mes && errors.mes}
                  />
                </Grid>
                <Grid item xs="6" sx={{ p: 1 }}>
                  <TextField
                    fullWidth
                    id="anio"
                    label="Año"
                    type="number"
                    value={values.anio}
                    error={touched.anio && Boolean(errors.anio)}
                    helperText={touched.anio && errors.anio}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Button
                sx={{ p: 2 }}
                color="primary"
                variant="contained"
                fullWidth
                disabled={loading}
                type="submit"
              >
                {loading ? 'Cargando...' : 'Liquidar sueldos'}
              </Button>
            </form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        {/* <Button onClick={handleClose} color="primary">
          Subscribe
      </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default LiquidacionesModal;
