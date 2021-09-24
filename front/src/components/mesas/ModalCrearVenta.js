/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Grid,
  MenuItem,
  Tab,
  Tabs,
  TextField,
  Typography,
  Select
} from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import SwipeableViews from 'react-swipeable-views';
import { crearVenta } from '../../controllers/ventas';

const ModalCrearVenta = (props) => {
  const {
    open,
    handleClose,
    setMesaOpen,
    productos,
    mesaId
  } = props;
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);
  const tarjetas = ['VISA', 'MASTERCARD', 'AMEX', 'OTRA'];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function TabPanel(props) {
    const {
      children, value, index, ...other
    } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  const validationSchema = yup.object({
    digitos: yup
      .number('Ingrese los últimos 4 dígitos de la tarjeta')
      .typeError('Debe ser un número válido')
      .required('Este campo debe contener solo números'),
    mes: yup
      .number('Ingrese el mes')
      .min(1, 'Debe ser un mes válido')
      .max(12, 'Debe ser un mes válido')
      .required('El mes es requerido'),
    anio: yup
      .number('Ingrese el año')
      .min(parseInt(moment(new Date()).format('YYYY'), 10), 'Debe ser un año válido')
      .max((parseInt(moment(new Date()).format('YYYY'), 10) + 20), 'Debe ser un año válido')
      .required('El año es requerido'),
  });

  const initialValues = {
    medio: 'tarjeta',
    tipo: tarjetas[0],
    digitos: '',
    anio: '',
    mes: ''
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <div>
        <AppBar
          position="static"
          color="default"
          sx={{
            minWidth: '500px'
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Tarjeta" {...a11yProps(0)} />
            <Tab label="Efectivo" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis="x"
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir="lft">
            Tarjeta:
            <Box sx={{
              maxWidth: '500px'
            }}
            >
              <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={async (values) => {
                  setLoading(true);
                  const res = await crearVenta(values, mesaId, productos);
                  if (res) {
                    setLoading(false);
                    alert('Venta registrada correctamente');
                    handleClose();
                    setMesaOpen(false);
                    // <Alert severity="success">This is a success alert — check it out!</Alert>
                  } else {
                    setLoading(false);
                    alert('Ha habido un error al crear la venta!');
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
                    <Grid container xs={12}>
                      <Grid item xs={12}>
                        <Select
                          fullWidth
                          id="tipo"
                          name="tipo"
                          component="select"
                          value={values.tipo}
                          style={{
                            height: 50, width: '100%', padding: '10px', 'margin-bottom': '15px'
                          }}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        >
                          {tarjetas.map((tarjeta) => (
                            <MenuItem value={tarjeta}>
                              {tarjeta}
                            </MenuItem>
                          ))}
                        </Select>
                      </Grid>
                      <Grid item xs={5.5} sx={{ p: 1 }}>
                        <br />
                        <TextField
                          fullWidth
                          id="digitos"
                          name="digitos"
                          label="Ultimos 4 dígitos"
                          type="number"
                          value={values.digitos}
                          error={touched.digitos && Boolean(errors.digitos)}
                          helperText={touched.digitos && errors.digitos}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 4);
                          }}
                        />
                      </Grid>
                      <Grid item xs={3} sx={{ p: 1 }}>
                        <Typography>
                          Mes
                        </Typography>
                        <TextField
                          fullWidth
                          id="mes"
                          label=""
                          type="number"
                          value={values.mes}
                          error={touched.mes && Boolean(errors.mes)}
                          helperText={touched.mes && errors.mes}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 2);
                          }}
                        />
                      </Grid>
                      <Grid item xs={3} sx={{ p: 1 }}>
                        <Typography>
                          Año
                        </Typography>
                        <TextField
                          fullWidth
                          id="anio"
                          label=""
                          type="number"
                          value={values.anio}
                          error={touched.anio && Boolean(errors.anio)}
                          helperText={touched.anio && errors.anio}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          onInput={(e) => {
                            e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 4);
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{
                      display: 'flex', flexDirection: 'row', justifyContent: 'right', p: 2
                    }}
                    >
                      <Button color="secondary" sx={{ px: 1 }} onClick={handleClose}>
                        Cancelar
                      </Button>
                      <Button
                        disabled={loading}
                        type="submit"
                        color="primary"
                        variant="contained"
                        sx={{ px: 1 }}
                      >
                        {loading ? 'Cargando...' : 'Aceptar'}
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1} dir="lft">
            <Box
              sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'left'
              }}
            >
              <Typography
                sx={{ justifyContent: 'left' }}
              >
                Pago en efectivo
              </Typography>
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}
            >
              <Button
                disabled={loading}
                type="submit"
                color="primary"
                variant="contained"
                onClick={async () => {
                  setLoading(true);
                  const efectivo = {
                    medio: 'Efectivo'
                  };
                  const res = await crearVenta(efectivo, mesaId, productos);
                  if (res) {
                    setLoading(false);
                    alert('Venta registrada correctamente');
                    handleClose();
                    setMesaOpen(false);
                    // <Alert severity="success">This is a success alert — check it out!</Alert>
                  } else {
                    setLoading(false);
                    alert('Ha habido un error al crear la venta!');
                  }
                }}
              >
                {loading ? 'Cargando...' : 'Aceptar'}
              </Button>
            </Box>
          </TabPanel>
        </SwipeableViews>
      </div>
    </Dialog>
  );
};

export default ModalCrearVenta;
