/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Select,
  InputLabel,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useState } from 'react';
import { Field, useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
// import Select from 'react-select';

const ProductosListToolbar = (props) => {
  const handleChange = (event) => {
    // eslint-disable-next-line no-undef
    setAge(event.target.value);
  };

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
    price: yup
      .number('Ingrese un número')
      .typeError('Debe ser un número válido')
      .required('El precio es requerido'),
    description: yup
      .string('Ingrese una descripción')
      .max(255, 'La descripción puede contener máximo 255 carácteres')
      .required('La descripción es requerida'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      description: '',
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
          Agregar Producto
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Nuevo Producto</DialogTitle>
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
              />
              <TextField
                fullWidth
                id="price"
                name="price"
                label="precio"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
              {/* <Select
                id="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                options={options}
              /> */}
              <TextField
                fullWidth
                id="description"
                name="description"
                label="descripción"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
              <h5> Categoría </h5>
              <FormikProvider value={formik}>
                <Field
                  fullWidth
                  margin="normal"
                  name="category"
                  component="select"
                  id="category"
                  style={{ height: 55, width: '100%' }}
                  label="categoria"
                  placeholder="categoría"
                >
                  <option value="Entrada">Entrada</option>
                  <option value="Plato Principal">Plato Principal</option>
                  <option value="Postre">Postre</option>
                  <option value="Bebida">Bebida</option>
                </Field>
              </FormikProvider>

              <Button sx={{ margin: '3px', marginLeft: '0px' }} color="primary" variant="contained" fullWidth type="submit">
                Agregar
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
          Eliminar Producto
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
                placeholder="Buscar producto"
                variant="outlined"
              />
            </Box>
            <Box sx={{
              alignItems: 'center', flexDirection: 'row', display: 'flex', justifyContent: ''
            }}
            >
              <InputLabel sx={{ alignSelf: 'center' }} id="prueba-select">
                Categoria
              </InputLabel>
              <Select
                labelId="prueba-select"
                id="prueba-select-simple"
                value="age"
                onChange={handleChange}
              >
                <MenuItem>Entrada</MenuItem>
                <MenuItem>Plato Principal</MenuItem>
                <MenuItem>Postre</MenuItem>
                <MenuItem>Bebida</MenuItem>
              </Select>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductosListToolbar;
