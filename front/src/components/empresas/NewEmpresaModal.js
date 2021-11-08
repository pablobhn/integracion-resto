/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
  Typography,
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
    email: yup
      .string().email('Ingrese un email válido')
      .required('El email es requerido'),
    situacionIva: yup
      .string('Ingrese la situación de IVA')
      .required('La situación es requerida'),
    imp: yup
      .number('Ingrese el concepto impositivo')
      .min(0, 'El porcentaje de impuesto no puede ser menor a 0%')
      .max(100, 'El porcentaje de impuesto no puede ser mayor a 100%')
      .required('El concepto impositivo es requerido'),
    descuento: yup
      .number('Ingrese el porcentaje de descuento')
      .min(0, 'El porcentaje de impuesto no puede ser menor a 0%')
      .max(100, 'El porcentaje de impuesto no puede ser mayor a 100%')
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
    email: '',
    situacionIva: '',
    imp: 0,
    descuento: 0,
    tel: '',
  };

  const categoriasIVA = [
    'Responsable Inscripto',
    'Monotributo',
    'Exento',
  ];

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" disableTypography="true" style={{ fontSize: '30px', fontFamily: 'sans-serif' }}> Crear Empresa</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Complete los campos
        </DialogContentText>
        <Formik
          validateOnChange
          validateOnBlur
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
                label="razón social"
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                sx={{ py: 1 }}
              />
              <TextField
                fullWidth
                id="cuit"
                name="cuit"
                label="cuit"
                value={values.cuit}
                onChange={handleChange}
                error={touched.cuit && Boolean(errors.cuit)}
                helperText={touched.cuit && errors.cuit}
                sx={{ py: 1 }}
              />
              <Typography>
                Situación IVA:
              </Typography>
              <Select
                fullWidth
                id="situacionIva"
                name="situacionIva"
                component="select"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.situacionIva}
              >
                {categoriasIVA.map((cat) => (
                  <MenuItem value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                fullWidth
                id="imp"
                name="imp"
                label="percepcion de IVA (%)"
                type="number"
                value={values.imp}
                onChange={handleChange}
                error={touched.imp && Boolean(errors.imp)}
                helperText={touched.imp && errors.imp}
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
                id="email"
                name="email"
                label="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
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
              <TextField
                fullWidth
                id="descuento"
                name="descuento"
                label="descuento a aplicar (%)"
                type="number"
                value={values.descuento}
                onChange={handleChange}
                error={touched.descuento && Boolean(errors.descuento)}
                helperText={touched.descuento && errors.descuento}
                sx={{ pt: 3, pb: 1 }}
              />
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
