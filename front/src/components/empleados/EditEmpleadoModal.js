/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
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
import { Field, useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
// import uploadImage from '../../controllers/images';
import { editarEmpleado } from '../../controllers/empleados';
import cargos from '../../__mocks__/cargos';

const EditEmpleadoModal = (props) => {
  const {
    open,
    handleClose,
    emp
  } = props;
  const [loading, setLoading] = React.useState(false);

  const validationSchema = yup.object({
    name: yup
      .string('Ingrese el nombre')
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
      .required('Las horas bases son requeridas'),
  });

  const empValues = {
    name: emp.name,
    address: emp.address,
    tel: emp.tel,
    rate: emp.rate,
    horasBase: emp.horasBase,
    fechaNacimiento: emp.fechaNacimiento,
    fechaIngreso: emp.fechaIngreso,
    role: emp.role
  };

  const formik = useFormik({
    initialValues: empValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await editarEmpleado(values, emp.id);
      if (res) {
        setLoading(false);
        alert('Empleado actualizado exitosamente');
        formik.resetForm();
        handleClose();
        // <Alert severity="success">This is a success alert — check it out!</Alert>
      } else {
        setLoading(false);
        alert('Ha habido un error al editar el empleado!');
      }
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" disableTypography="true" style={{ fontSize: '30px', fontFamily: 'sans-serif' }}> Editar Empleado</DialogTitle>
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
            sx={{ margin: '2px' }}
          />
          <label>
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
            />
          </label>
          <TextField
            fullWidth
            id="address"
            name="address"
            label="dirección"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            sx={{ margin: '2px' }}
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
            sx={{ margin: '2px' }}
          />
          <label>
            <Typography>
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
          </label>
          <FormikProvider value={formik}>
            <label>
              <Typography>
                Cargo:
              </Typography>
              <Field
                fullWidth
                id="type"
                name="type"
                margin="normal"
                component="select"
                onChange={formik.handleChange}
                style={{
                  height: 50, width: '100%', padding: '10px', 'margin-bottom': '15px'
                }}
                value={formik.values.type}
              >
                {cargos.map((cargo) => (
                  <option value={cargo}>
                    {cargo}
                  </option>
                ))}
              </Field>
            </label>
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
              sx={{ margin: '2px' }}
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
              sx={{ margin: '2px' }}
            />
          </FormikProvider>
          <Box sx={{ p: 2 }}>
            <input
              style={{ display: 'none' }}
              accept="image/*"
            // className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
            />
            {/* <label htmlFor="contained-button-file">
            <Button
              id="imgSrc"
              name="imgSrc"
              color="primary"
              component="label"
              sx={{ margin: '3px', marginLeft: '0px' }}
              fullWidth
            >
              <input
                accept="image/*"
                multiple
                type="file"
                hidden
                onChange={async (e) => {
                  setLoading(true);
                  const res = await uploadImage(e.target.files[0]);
                  if (res) {
                    console.log(res.url);
                    setImgUrl(res.url);
                    setLoading(false);
                  }
                }}
              />
              Subir foto
            </Button>
          </label> */}
          </Box>
          <Button
            sx={{ margin: '3px', marginLeft: '0px' }}
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

export default EditEmpleadoModal;
