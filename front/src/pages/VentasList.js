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
import VentasListResults from 'src/components/ventas/VentasListResults';
import { listarVentas } from 'src/controllers/ventas';

const VentasList = () => {
  const [loading, setLoading] = useState(false);
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    async function componentDidMount() {
      setLoading(true);
      const res = await listarVentas();
      setVentas(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }

    componentDidMount();
  }, true);

  async function handleUpdate() {
    setLoading(true);
    const res = await listarVentas();
    setVentas(res.data);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }

  return (
    <>
      <Helmet>
        <title>Ventas | Casa Cavia</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 1
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
              <VentasListResults ventas={ventas} handleUpdate={handleUpdate} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default VentasList;
