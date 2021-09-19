import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import { useState } from 'react';
import { Field, useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import { Search as SearchIcon } from 'react-feather';

const EmpleadosListToolbar = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    name: yup
      .string('Ingrese el nombre')
      .max(255, 'El nombre puede contener máximo 255 carácteres')
      .required('El nombre es requerido'),
    surname: yup
      .string('Ingrese el apellido')
      .max(255, 'El apellido puede contener máximo 255 carácteres')
      .required('El apellido es requerido'),
    email: yup
      .string('Ingrese un email')
      .email('Debe ser un email válido')
      .max(255, 'El email puede contener máximo 255 carácteres')
      .required('El email es requerido'),
    direction: yup
      .string('Ingrese una dirección')
      .max(255, 'La descripción puede contener máximo 255 carácteres')
      .required('La dirección es requerida'),
    phone: yup
      .string('Ingrese un teléfono')
      .max(255, 'El teléfono puede contener máximo 255 carácteres')
      .required('El teléfono es requerido'),
    initialdate: yup
      .date('Ingrese la fecha de ingreso')
      .required('La fecha es requerida'),
    salary: yup
      .number('Ingrese el sueldo básico')
      .typeError('Debe ser un número válido')
      .required('El sueldo es requerido'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      direction: '',
      phone: '',
      initialdate: '',
      salary: '',
    },
    validationSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2));
    },

  });

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          direction: 'row'
        }}
      >
        {/* <Button>
          Import
        </Button> */}

        <Button
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
        >
          Nuevo Empleado
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title" disableTypography="true" style={{ fontSize: '30px', fontFamily: 'sans-serif' }}>
            Nuevo Empleado
          </DialogTitle>
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
              <TextField
                fullWidth
                id="surname"
                name="surname"
                label="apellido"
                value={formik.values.surname}
                onChange={formik.handleChange}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
                helperText={formik.touched.surname && formik.errors.surname}
                sx={{ margin: '2px' }}
              />
              <h5 style={{ fontFamily: 'sans-serif' }}> Cargo </h5>
              <FormikProvider value={formik}>
                <Field
                  fullWidth
                  margin="normal"
                  name="cargo"
                  component="select"
                  id="cargo"
                  style={{ height: 55, width: '100%' }}
                  label="cargo"
                  placeholder="cargo"
                  sx={{ margin: '2px' }}
                >
                  <option value="Supervisor">Supervisor</option>
                  <option value="Mozo">Mozo</option>
                  <option value="Valet Parking">Valet Parking</option>
                  <option value="Cocinero">Cocinero</option>
                  <option value="Limpieza">Limpieza</option>
                </Field>
              </FormikProvider>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ margin: '2px' }}
              />
              {/* <Select
                  id="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  options={options}
                /> */}
              <TextField
                fullWidth
                id="direction"
                name="direction"
                label="dirección"
                value={formik.values.direction}
                onChange={formik.handleChange}
                error={formik.touched.direction && Boolean(formik.errors.direction)}
                helperText={formik.touched.direction && formik.errors.direction}
                sx={{ margin: '2px' }}
              />
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="teléfono"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                sx={{ margin: '2px' }}
              />
              <TextField
                fullWidth
                id="salary"
                name="salary"
                label="salario"
                type="number"
                value={formik.values.salary}
                onChange={formik.handleChange}
                error={formik.touched.salary && Boolean(formik.errors.salary)}
                helperText={formik.touched.salary && formik.errors.salary}
                sx={{ margin: '2px' }}
              />
              {/* <TextField
                fullWidth
                id="initialdate"
                name="initialdate"
                label="fecha de ingreso"
                value={formik.values.initialdate}
                onChange={formik.handleChange}
                error={formik.touched.initialdate && Boolean(formik.errors.initialdate)}
                helperText={formik.touched.initialdate && formik.errors.initialdate}
                sx={{ margin: '2px' }}
              /> */}
              <Box sx={{ marginTop: '2px' }}>
                <input
                  style={{ display: 'none' }}
                  accept="image/*"
                    // className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                {/* <label htmlFor="contained-button-file">
                  <Button variant="contained" color="secondary" component="span">
                    Subir foto
                  </Button>
                </label> */}
              </Box>

              <Button sx={{ margin: '3px', marginLeft: '0px' }} color="primary" variant="contained" fullWidth type="submit">
                Confirmar
              </Button>

            </form>

            {/* <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
              /> */}
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
        <Button sx={{ mx: 1 }}>
          Liquidar sueldos
        </Button>
      </Box>
      <Box sx={{
        mt: 3, flexDirection: 'column', display: 'flex', justifyContent: 'flex-end'
      }}
      >
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box sx={{ maxWidth: 500 }}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Buscar empleado"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default EmpleadosListToolbar;
