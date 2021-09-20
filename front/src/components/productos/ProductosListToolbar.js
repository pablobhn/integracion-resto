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

  return (
    <Box {...props}>
      <Box sx={{
        mt: 1, flexDirection: 'column', display: 'flex', justifyContent: 'flex-end'
      }}
      >
        <Card>
          <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'right' }}>
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
