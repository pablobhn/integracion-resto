/* eslint-disable semi */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
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
  Select,
} from '@material-ui/core';
import { Formik } from 'formik';
import * as yup from 'yup';
import uploadImage from '../../controllers/images';
import { editarProducto } from '../../controllers/productos';
import categorias from '../../__mocks__/categorias';
import { showSuccess } from '../Alerts';

const EditProductModal = (props) => {
  const {
    open,
    handleClose,
    handleCloseAndUpdate,
    prod
  } = props;
  const [loading, setLoading] = React.useState(false);
  const [imgUrl, setImgUrl] = React.useState('');

  useEffect(() => {
    async function componentDidMount() {
      setImgUrl(prod.imgUrl);
    }

    componentDidMount();
  }, true);

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

  const prodValues = {
    name: prod.title,
    price: prod.price,
    description: prod.description,
    type: prod.type,
    sinTac: prod.sinTac,
    vegano: prod.vegano
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle disableTypography="true" style={{ fontSize: '30px', fontFamily: 'sans-serif' }}> Editar Producto</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ py: 1 }}>
          Complete los campos
        </DialogContentText>
        <Formik
          validationOnChange
          validationSchema={validationSchema}
          initialValues={prodValues}
          onSubmit={async (values) => {
            setLoading(true);
            const res = await editarProducto(values, imgUrl, prod.id);
            if (res) {
              setLoading(false);
              showSuccess('Producto actualizado exitosamente');
              handleCloseAndUpdate();
              // handleCloseAndUpdate();
              // <Alert severity="success">This is a success alert — check it out!</Alert>
            } else {
              setLoading(false);
              alert('Ha habido un error al actualizar el producto!');
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
                Categoría
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
              <Grid container sx={{ py: 2, justifyContent: 'center' }}>
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
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
