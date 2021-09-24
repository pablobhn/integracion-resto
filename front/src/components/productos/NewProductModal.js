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
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select
} from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import uploadImage from '../../controllers/images';
import { crearProducto } from '../../controllers/productos';
import categorias from '../../__mocks__/categorias';

const NewProductModal = (props) => {
  const {
    open,
    handleClose
  } = props;
  const [loading, setLoading] = React.useState(false);
  const [imgUrl, setImgUrl] = React.useState('http://wws.com.pa/wp-content/plugins/wordpress-ecommerce/marketpress-includes/images/default-product.png');

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

  const initialValues = {
    name: '',
    price: '',
    description: '',
    type: categorias[0],
    sinTac: false,
    vegano: false,
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" disableTypography="true" style={{ fontSize: '30px', fontFamily: 'sans-serif' }}> Nuevo Producto</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Complete los campos
        </DialogContentText>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={async (values) => {
            setLoading(true);
            const res = await crearProducto(values, imgUrl);
            if (res) {
              setLoading(false);
              alert('Producto creado ok');
              handleClose();
              // <Alert severity="success">This is a success alert — check it out!</Alert>
            } else {
              setLoading(false);
              alert('Ha habido un error al crear el producto!');
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
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                sx={{ py: 1 }}
              />
              <TextField
                fullWidth
                id="price"
                name="price"
                label="precio"
                type="number"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                sx={{ py: 1 }}
              />
              <TextField
                fullWidth
                id="description"
                name="description"
                label="descripción"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                sx={{ py: 1 }}
              />
              <Typography>
                Categoría:
              </Typography>
              <Select
                fullWidth
                id="type"
                name="type"
                component="select"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.type}
              >
                {categorias.map((categoria) => (
                  <MenuItem value={categoria}>
                    {categoria}
                  </MenuItem>
                ))}
              </Select>
              <Grid container sx={{ py: 1, justifyContent: 'center' }}>
                <Grid
                  itm
                  xs={4}
                >
                  <FormControlLabel
                    id="sinTac"
                    name="sinTac"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    control={(
                      <Checkbox
                        checked={values.sinTac}
                        value={values.sinTac}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    )}
                    value={values.sinTac}
                    label="Libre de TAAC"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid
                  itm
                  xs={4}
                >
                  <FormControlLabel
                    id="vegano"
                    name="vegano"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    control={(
                      <Checkbox
                        checked={values.vegano}
                        value={values.vegano}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                  )}
                    value={values.vegano}
                    label="Apto vegano"
                    labelPlacement="end"
                  />
                </Grid>
              </Grid>
              <Box sx={{ p: 2 }}>
                <input
                  style={{ display: 'none' }}
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
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
                    Subir imagen
                  </Button>
                </label>
              </Box>
              <Button
                sx={{ margin: '3px', marginLeft: '0px' }}
                color="primary"
                variant="contained"
                fullWidth
                disabled={loading}
                type="submit"
              >
                {loading ? 'Cargando...' : 'Actualizar'}
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

export default NewProductModal;
