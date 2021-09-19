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
  Typography,
  Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ModalSeleccionProductos from './ModalSeleccionProductos';
import { useStickyState } from '../../utils/useStickyState';
import { listarProductos } from '../../controllers/productos';

const MesaCard = ({ mesa, ...rest }) => {
  const [mesaOpen, setMesaOpen] = useStickyState(false, `open${mesa.id}`);
  const [open, setOpen] = useState(false);
  const [productos, setProductos] = useStickyState([], `productos${mesa.id}`);

  const itemsPrice = productos.reduce((a, c) => a + c.qty * c.price, 0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMesaOpen = () => {
    setMesaOpen(true);
  };

  const handleMesaClose = () => {
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
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pb: 3
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
        </CardContent>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
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
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pb: 3
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
        <ModalSeleccionProductos productos={mesa.productos} open={open} handleClose={handleClose} onAdd={onAdd} />
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <div>
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
              <Grid item xs={2}>
                <Avatar src={item.avatarUrl} variant="square" sx={{ p: 1 }} />
              </Grid>
              <Grid item xs={1}>
                <button
                  onClick={() => onRemove(item.id)}
                  className="remove"
                  padding="15"
                >
                  -
                </button>
              </Grid>
              <Grid item xs={1}>
                <button onClick={() => onAdd(item.id)} className="add">
                  +
                </button>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  {`${item.title}`}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>
                  {`$${item.price.toFixed(2)}`}
                </Typography>
              </Grid>
            </Grid>
          ))}
          <Grid item xs={12}>
            {productos.length !== 0 && (
            <>
              <Container>
                <hr />
                <Container>
                  <Typography>
                    <strong>
                      Total $
                      {itemsPrice.toFixed(2)}
                    </strong>
                  </Typography>
                </Container>
              </Container>
            </>
            )}
          </Grid>
        </Grid>
      </div>
      <Button
        onClick={handleClickOpen}
      >
        <Typography
          align="center"
          color="textPrimary"
          variant="body2"
        >
          Agregar producto
        </Typography>
      </Button>
      <Divider />
      <Box sx={{ p: 2 }}>
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
