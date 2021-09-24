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
  MenuItem,
  Select,
  TextField,
  Typography
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import uploadImage from '../../controllers/images';
import { crearEmpleado } from '../../controllers/empleados';
import cargos from '../../__mocks__/cargos';

const NewEmpleadoModal = (props) => {
  const {
    open,
    handleClose,
    handleCloseAndUpdate
  } = props;
  const [loading, setLoading] = React.useState(false);
  // const [imgUrl, setImgUrl] = React.useState('http://wws.com.pa/wp-content/plugins/wordpress-ecommerce/marketpress-includes/images/default-product.png');

  const validationSchema = yup.object({
    name: yup
      .string('Ingrese el nombre completo')
      .max(255, 'El nombre puede contener máximo 255 carácteres')
      .required('El nombre es requerido'),
    address: yup
      .string('Ingrese el domicilio')
      .max(255, 'El domicilio puede contener máximo 255 carácteres')
      .required('El domicilio es requerido'),
    tel: yup
      .string('Ingrese un teléfono')
      .max(20, 'El teléfono puede contener máximo 20 carácteres')
      .required('El teléfono es requerido'),
    rate: yup
      .number('Ingrese el sueldo básico')
      .required('El sueldo básico es requerido'),
    horasBase: yup
      .number('Ingrese las horas base')
      .required('Las horas bases son requeridas.'),
  });

  const initialValues = {
    name: '',
    address: '',
    tel: '',
    rate: 0,
    horasBase: 160,
    fechaNacimiento: new Date(),
    fechaIngreso: new Date(),
    role: cargos[0]
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await crearEmpleado(values);
      if (res) {
        setLoading(false);
        alert('El empleado ha sido dado de alta correctamente');
        formik.resetForm();
        handleCloseAndUpdate();
        // <Alert severity="success">This is a success alert — check it out!</Alert>
      } else {
        setLoading(false);
        alert('Ha habido un error dar de alta el empleado');
      }
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" disableTypography="true" style={{ fontSize: '30px', fontFamily: 'sans-serif' }}> Nuevo Empleado</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Complete los campos
        </DialogContentText>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="nombre"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
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
            value={formik.values.fechaNacimiento}
            error={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
            helperText={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            sx={{ py: 1 }}
          />
          <TextField
            fullWidth
            id="address"
            name="address"
            label="dirección"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            sx={{ py: 1 }}
          />
          <TextField
            fullWidth
            id="tel"
            name="tel"
            label="teléfono"
            value={formik.values.tel}
            onChange={formik.handleChange}
            error={formik.touched.tel && Boolean(formik.errors.tel)}
            helperText={formik.touched.tel && formik.errors.tel}
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
            value={formik.values.fechaIngreso}
            error={formik.touched.fechaIngreso && Boolean(formik.errors.fechaIngreso)}
            helperText={formik.touched.fechaIngreso && formik.errors.fechaIngreso}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <Typography>
            Cargo:
          </Typography>
          <Select
            fullWidth
            id="type"
            name="type"
            component="select"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.role}
          >
            {cargos.map((cargo) => (
              <MenuItem value={cargo}>
                {cargo}
              </MenuItem>
            ))}
          </Select>
          <TextField
            fullWidth
            id="rate"
            name="rate"
            label="sueldo básico"
            type="number"
            value={formik.values.rate}
            onChange={formik.handleChange}
            error={formik.touched.rate && Boolean(formik.errors.rate)}
            helperText={formik.touched.rate && formik.errors.rate}
            sx={{ pt: 3, pb: 1 }}
          />
          <TextField
            fullWidth
            id="horasBase"
            name="horasBase"
            label="horas base"
            type="number"
            value={formik.values.horasBase}
            onChange={formik.handleChange}
            error={formik.touched.horasBase && Boolean(formik.errors.horasBase)}
            helperText={formik.touched.horasBase && formik.errors.horasBase}
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

export default NewEmpleadoModal;
