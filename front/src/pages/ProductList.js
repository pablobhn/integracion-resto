/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  CircularProgress,
  Dialog,
  DialogContent
} from '@material-ui/core';
import ProductosListResults from 'src/components/productos/ProductosListResults';
import { listarProductos } from 'src/controllers/productos';

const ProductList = () => {
  const [loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);

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

  async function handleUpdate() {
    setLoading(true);
    const res = await listarProductos();
    setProductos(res.data);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }

  return (
    <>
      <Helmet>
        <title>Productos | Casa Cavia</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 2
        }}
      >
        <Container maxWidth={false}>
          <Box>
            { loading ? (
              <Dialog
                open={loading}
                PaperProps={{
                  style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  },
                }}
              >
                <DialogContent style={{ overflow: 'hidden' }}>
                  <CircularProgress color="secondary" />
                </DialogContent>
              </Dialog>
            ) : (
              <ProductosListResults productos={productos} handleUpdate={handleUpdate} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ProductList;
