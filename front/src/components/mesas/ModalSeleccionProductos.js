/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Dialog,
  InputLabel,
  FormControl,
  Select
} from '@material-ui/core';
import { listarProductos } from '../../controllers/productos';
import categorias from '../../__mocks__/categorias';

const ModalSeleccionProductos = (props) => {
  const { open, handleClose, onAdd } = props;
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function componentDidMount() {
      setLoading(true);
      const res = await listarProductos();
      setProductos(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }

    componentDidMount();
  }, true);

  const handleChange = (event) => {
    onAdd(event.target.value);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      { loading ? (
        <CircularProgress />
      ) : (
        <div>
          <FormControl sx={{ m: 1, minWidth: 300, p: 1 }}>
            <InputLabel htmlFor="grouped-native-select">Productos</InputLabel>
            <Select
              native
              defaultValue=""
              id="grouped-native-select"
              label="Productos"
              onChange={handleChange}
            >
              <option aria-label="None" value="" />
              {categorias.map((categoria) => (
                <optgroup label={categoria}>
                  {productos.map((producto) => (
                    (producto.type === categoria) ? (
                      <option value={producto.id}>
                        {producto.title}
                      </option>
                    ) : (<></>)
                  ))}
                </optgroup>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
    </Dialog>
  );
};

export default ModalSeleccionProductos;
