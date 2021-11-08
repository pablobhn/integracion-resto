/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  Typography,
} from '@material-ui/core';
import { crearVenta } from '../../controllers/ventas';

const ModalCrearVenta = (props) => {
  const {
    open,
    handleClose,
    setMesaOpen,
    productos,
    mesaId
  } = props;

  const [loading, setLoading] = useState(false);
  const itemsPrice = productos.reduce((a, c) => a + c.qty * c.price, 0);

  const onSubmit = async () => {
    setLoading(true);
    const res = await crearVenta(mesaId, productos);
    if (res) {
      setLoading(false);
      alert('Venta registrada correctamente');
      handleClose();
      setMesaOpen(false);
      // <Alert severity="success">This is a success alert — check it out!</Alert>
    } else {
      setLoading(false);
      alert('Ha habido un error al crear la venta!');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <div>
        <Typography
          sx={{
            minWidth: 500,
            p: 3
          }}
        >
          Confirmar venta por un total de $
          { itemsPrice }
          ?
        </Typography>
        <Box sx={{
          display: 'flex', flexDirection: 'row', justifyContent: 'right', p: 2
        }}
        >
          <Button color="secondary" sx={{ px: 1 }} onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            disabled={loading}
            onClick={onSubmit}
            type="submit"
            color="primary"
            variant="contained"
            sx={{ px: 1 }}
          >
            {loading ? 'Cargando...' : 'Aceptar'}
          </Button>
        </Box>
      </div>
    </Dialog>
  );
};

export default ModalCrearVenta;
