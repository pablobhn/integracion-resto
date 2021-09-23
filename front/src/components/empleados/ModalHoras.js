/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import { registrarHoras } from '../../controllers/empleados';

const ModalHoras = (props) => {
  const {
    open,
    handleClose,
    id,
    handleUpdate
  } = props;
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(0);

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
    horas: yup
      .number('Ingrese la cantidad de horas')
      .typeError('Debe ser un número válido')
      .required('Este campo debe contener solo números')
  });

  const initialValues = {
    horas: '',
    fecha: ''
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
            onChange={handleChangeIndex && handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Horas extra" {...a11yProps(0)} />
            <Tab label="Faltas" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <Box sx={{ p: 2 }}>
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={async (values) => {
              setLoading(true);
              const res = await registrarHoras(id, value, values);
              if (res) {
                setLoading(false);
                alert('Horas registradas correctamente');
                handleUpdate();
                handleClose();
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
                  <Grid item xs={5.75} sx={{ margin: '2px' }}>
                    <TextField
                      fullWidth
                      id="horas"
                      name="horas"
                      label="Cantidad de horas"
                      type="number"
                      value={values.horas}
                      error={touched.horas && Boolean(errors.horas)}
                      helperText={touched.horas && errors.horas}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value, 10)).toString().slice(0, 2);
                      }}
                    />
                  </Grid>
                  <Grid item xs={5.75} sx={{ margin: '2px' }}>
                    <TextField
                      fullWidth
                      id="fecha"
                      label=""
                      type="date"
                      value={values.fecha}
                      error={touched.fecha && Boolean(errors.fecha)}
                      helperText={touched.fecha && errors.fecha}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
      </div>
    </Dialog>
  );
};

export default ModalHoras;
