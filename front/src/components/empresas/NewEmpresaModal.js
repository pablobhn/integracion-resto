/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';
// import uploadImage from '../../controllers/images';
import { crearEmpresa } from '../../controllers/empresas';

const NewEmpresaModal = (props) => {
  const {
    open,
    handleClose,
    handleCloseAndUpdate
  } = props;
  const [loading, setLoading] = React.useState(false);
  // const [imgUrl, setImgUrl] = React.useState('http://wws.com.pa/wp-content/plugins/wordpress-ecommerce/marketpress-includes/images/default-product.png');

  const validationSchema = yup.object({
    name: yup
      .string('Ingrese el nombre/razón social completo')
      .max(255, 'El nombre/razón social puede contener máximo 255 carácteres')
      .required('El nombre/razón social es requerido'),
    address: yup
      .string('Ingrese el domicilio')
      .max(255, 'El domicilio puede contener máximo 255 carácteres')
      .required('El domicilio es requerido'),
    cuit: yup
      .number('Ingrese el cuit')
      .min(12, 'El cuit tiene que tener como mínimo 12 carácteres')
      .required('El cuit es requerido'),
    situacionIva: yup
      .string('Ingrese la situación de IVA')
      .required('La situación es requerida'),
    imp: yup
      .number('Ingrese el concepto impositivo')
      .required('El concepto impositivo es requerido'),
    tel: yup
      .string('Ingrese un teléfono')
      .max(20, 'El teléfono puede contener máximo 20 carácteres')
      .required('El teléfono es requerido'),
  });

  const initialValues = {
    name: '',
    address: '',
    cuit: 0,
    situacionIva: '',
    imp: 0,
    tel: '',
    fechaIngreso: new Date(),
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" disableTypography="true" style={{ fontSize: '30px', fontFamily: 'sans-serif' }}> Crear Empresa</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Complete los campos
        </DialogContentText>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={async (values) => {
            setLoading(true);
            const res = await crearEmpresa(values);
            if (res) {
              setLoading(false);
              alert('Empresa creada exitosamente');
              handleCloseAndUpdate();
              // <Alert severity="success">This is a success alert — check it out!</Alert>
            } else {
              setLoading(false);
              alert('Ha habido un error al crear la empresa!');
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
              <TextField
                fullWidth
                id="name"
                name="name"
                label="nombre"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                sx={{ py: 1 }}
              />
              <Typography>
                Fecha de nacimiento
              </Typography>
              <TextField
                fullWidth
                id="fechaNacimiento"
                label=""
                type="date"
                value={values.fechaNacimiento}
                error={touched.fechaNacimiento && Boolean(errors.fechaNacimiento)}
                helperText={touched.fechaNacimiento && errors.fechaNacimiento}
                onBlur={handleBlur}
                onChange={handleChange}
                sx={{ py: 1 }}
              />
              <TextField
                fullWidth
                id="address"
                name="address"
                label="dirección"
                value={values.address}
                onChange={handleChange}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                sx={{ py: 1 }}
              />
              <TextField
                fullWidth
                id="tel"
                name="tel"
                label="teléfono"
                value={values.tel}
                onChange={handleChange}
                error={touched.tel && Boolean(errors.tel)}
                helperText={touched.tel && errors.tel}
                sx={{ py: 1 }}
              />
              <Typography sx={{ py: 1 }}>
                Fecha de ingreso
              </Typography>
              <TextField
                fullWidth
                id="fechaIngreso"
                label=""
                type="date"
                value={values.fechaIngreso}
                error={touched.fechaIngreso && Boolean(errors.fechaIngreso)}
                helperText={touched.fechaIngreso && errors.fechaIngreso}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <TextField
                fullWidth
                id="rate"
                name="rate"
                label="sueldo básico"
                type="number"
                value={values.rate}
                onChange={handleChange}
                error={touched.rate && Boolean(errors.rate)}
                helperText={touched.rate && errors.rate}
                sx={{ pt: 3, pb: 1 }}
              />
              <TextField
                fullWidth
                id="horasBase"
                name="horasBase"
                label="horas base"
                type="number"
                value={values.horasBase}
                onChange={handleChange}
                error={touched.horasBase && Boolean(errors.horasBase)}
                helperText={touched.horasBase && errors.horasBase}
                sx={{ py: 1 }}
              />
              <Box sx={{ p: 2 }}>
                <input
                  style={{ display: 'none' }}
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
              </Box>
              <Button
                sx={{ py: 1 }}
                color="primary"
                variant="contained"
                fullWidth
                disabled={loading}
                type="submit"
              >
                {loading ? 'Cargando...' : 'Agregar'}
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

export default NewEmpresaModal;
