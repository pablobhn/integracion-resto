/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import CloseIcon from '@material-ui/icons/Close';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ModalSeleccionProductos from './ModalSeleccionProductos';
import ModalCrearVenta from './ModalCrearVenta';
import { useStickyState } from '../../utils/useStickyState';
import { listarProductos } from '../../controllers/productos';

const MesaCard = ({ mesa, ...rest }) => {
  const [mesaOpen, setMesaOpen] = useStickyState(false, `open${mesa.id}`);
  const [open, setOpen] = useState(false);
  const [openModalVenta, setOpenModalVenta] = useState(false);
  const [productos, setProductos] = useStickyState([], `productos${mesa.id}`);
  const [pago, setPago] = useState({});

  const itemsPrice = productos.reduce((a, c) => a + c.qty * c.price, 0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenModalVenta = () => {
    setOpenModalVenta(true);
  };

  const handleCloseModalVenta = () => {
    setOpenModalVenta(false);
  };

  const handleMesaOpen = () => {
    setMesaOpen(true);
  };

  const handleMesaClose = () => {
    if (productos.length > 0) {
      setOpenModalVenta(true);
    } else {
      setMesaOpen(false);
    }
  };

  const handleSetMesaOpen = () => {
    setProductos([]);
    setMesaOpen(false);
  };

  const onAdd = async function (productId) {
    const res = await listarProductos(productId);
    const product = res.data;

    const exist = productos.find((x) => x.id === product.id);
    if (exist) {
      setProductos(
        productos.map((x) => (x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x))
      );
    } else {
      setProductos([...productos, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (productId) => {
    const exist = productos.find((x) => x.id === productId);
    if (exist.qty === 1) {
      setProductos(productos.filter((x) => x.id !== productId));
    } else {
      setProductos(
        productos.map((x) => (x.id === productId ? { ...exist, qty: exist.qty - 1 } : x))
      );
    }
  };

  if (!mesaOpen) {
    return (
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <CardContent sx={{ pb: 0.75 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pb: 1
            }}
          >
            <Avatar
              alt="Mesa"
              src={mesa.media}
              variant="square"
            />
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {mesa.title}
          </Typography>
          <Divider />
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider sx={{ p: 0.5 }} />
        <Box sx={{ p: 1 }}>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <AddCircleOutlineIcon color="action" />
              <Button
                onClick={handleMesaOpen}
              >
                ABRIR MESA
              </Button>

            </Grid>
          </Grid>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent sx={{ pb: 0.75 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 1
          }}
        >
          <Avatar
            alt="Mesa"
            src={mesa.media}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {mesa.title}
        </Typography>
        <Divider />
        <ModalSeleccionProductos open={open} handleClose={handleClose} onAdd={onAdd} />
        <ModalCrearVenta open={openModalVenta} handleClose={handleCloseModalVenta} setMesaOpen={handleSetMesaOpen} productos={productos} mesaId={mesa.id} />
      </CardContent>
      <Box sx={{ p: 1 }}>
        {productos.length === 0 && (
          <Typography
            align="center"
            color="textPrimary"
            variant="body2"
          >
            Sin consumos
          </Typography>
        )}
        <Grid container sx={{ flexGrow: 1 }}>
          {productos.map((item) => (
            <Grid container xs={12}>
              <Grid item xs={1.5} sx={{ p: 0.25 }}>
                <Avatar src={item.avatarUrl} variant="square" />
              </Grid>
              <Grid item xs={1}>
                <IconButton fontSize="small">
                  <RemoveCircleRoundedIcon
                    fontSize="small"
                    onClick={() => onRemove(item.id)}
                  />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton>
                  <AddCircleRoundedIcon
                    fontSize="small"
                    onClick={() => onAdd(item.id)}
                  />
                </IconButton>
              </Grid>
              <Grid item xs={6} sx={{ p: 1 }}>
                <Typography fontSize="small">
                  {`${item.qty} x ${item.title.length > 20 ? (`${item.title.substring(0, 19)}...`) : item.title}`}
                </Typography>
              </Grid>
              <Grid item xs={1.5} sx={{ p: 1 }}>
                <Typography fontSize="small">
                  {`$${item.price.toFixed(2)}`}
                </Typography>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12} sx={{ p: 1 }}>
            <Divider sx={{ my: 0, mb: 2 }} />
            {productos.length !== 0 && (
            <Container>
              <Typography align="right">
                <strong>
                  Total: $
                  {itemsPrice.toFixed(2)}
                </strong>
              </Typography>
            </Container>
            )}
          </Grid>
        </Grid>
      </Box>
      <Button
        onClick={handleClickOpen}
      >
        <Typography
          align="center"
          color="primary"
        >
          Agregar productos
        </Typography>
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <Divider sx={{ p: 0.5 }} />
      <Box sx={{ p: 1 }}>
        <Grid
          container
          spacing={2}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid
            item
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <CloseIcon color="action" />
            <Button
              color="secondary"
              onClick={handleMesaClose}
            >
              CERRAR MESA
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

MesaCard.propTypes = {
  mesa: PropTypes.object.isRequired
};

export default MesaCard;
