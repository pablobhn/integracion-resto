/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useState } from 'react';
import { Field, useFormik, FormikProvider } from 'formik';
import * as yup from 'yup';
import NewProductModal from './NewProductModal';

const ProductosListToolbar = (props) => {
  const { handleUpdate } = props;
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
    handleUpdate();
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
      type: '',
      sinTac: false,
      vegano: false
    },
    validationSchema,
    onSubmit: (values) => {
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2));
    },

  });

  return (
    <Box {...props}>
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
              <Box>
                <InputLabel sx={{ alignSelf: 'center' }} id="prueba-select">
                  Categoria
                </InputLabel>
              </Box>
              <Box>
                <Select
                  labelId="prueba-select"
                  placeholder="Seleccione una categoría"
                  id="prueba-select-simple"
                  value="age"
                  // onChange={handleChange}
                >
                  <MenuItem>Entrada</MenuItem>
                  <MenuItem>Plato Principal</MenuItem>
                  <MenuItem>Postre</MenuItem>
                  <MenuItem>Bebida</MenuItem>
                </Select>
              </Box>
            </Box>
            <Button
              color="primary"
              variant="contained"
              onClick={handleClickOpen}
            >
              Agregar Producto
            </Button>
            <NewProductModal open={open} handleClose={handleClose} />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ProductosListToolbar;
