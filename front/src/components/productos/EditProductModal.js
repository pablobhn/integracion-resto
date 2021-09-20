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
import uploadImage from '../../controllers/images';
import { editarProducto } from '../../controllers/productos';
import categorias from '../../__mocks__/categorias';

const EditProductModal = (props) => {
  const {
    open,
    handleClose,
    prod
  } = props;
  const [loading, setLoading] = React.useState(false);
  const [imgUrl, setImgUrl] = React.useState('');

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

  const formik = useFormik({
    initialValues: prodValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);
      if (imgUrl === '') {
        setImgUrl(prod.imageSrc);
      }
      const res = await editarProducto(values, imgUrl, prod.id);
      if (res) {
        setLoading(false);
        alert('Producto actualizado exitosamente');
        formik.resetForm();
        handleClose();
        // <Alert severity="success">This is a success alert — check it out!</Alert>
      } else {
        setLoading(false);
        alert('Ha habido un error al crear el producto!');
      }
    },
  });

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle disableTypography="true" style={{ fontSize: '30px', fontFamily: 'sans-serif' }}> Nuevo Producto</DialogTitle>
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
            id="price"
            name="price"
            label="precio"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            sx={{ margin: '2px' }}
          />
          <TextField
            fullWidth
            id="description"
            name="description"
            label="descripción"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            sx={{ margin: '2px' }}
          />
          <FormikProvider value={formik}>
            <label>
              <Typography>
                Categoría:
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
                {categorias.map((categoria) => (
                  <option value={categoria}>
                    {categoria}
                  </option>
                ))}
              </Field>
            </label>
            <div>
              <Field
                id="sinTac"
                name="sinTac"
                type="checkbox"
              />
              Libre de TACC
              <Field
                id="vegano"
                name="vegano"
                type="checkbox"
              />
              Apto vegano
            </div>
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
            {loading ? 'Cargando...' : 'Guardar cambios'}
          </Button>
        </form>
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
