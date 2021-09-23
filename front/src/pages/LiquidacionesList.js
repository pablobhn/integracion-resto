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
import LiquidacionesListResults from 'src/components/liquidaciones/LiquidacionesListResults';
import { listarLiquidaciones } from 'src/controllers/liquidaciones';

const LiquidacionesList = () => {
  const [loading, setLoading] = useState(false);
  const [liquidaciones, setLiquidaciones] = useState([]);

  useEffect(() => {
    async function componentDidMount() {
      setLoading(true);
      const res = await listarLiquidaciones();
      setLiquidaciones(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }

    componentDidMount();
  }, true);

  async function handleUpdate() {
    setLoading(true);
    const res = await listarLiquidaciones();
    setLiquidaciones(res.data);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }

  return (
    <>
      <Helmet>
        <title>Liquidaciones | Casa Cavia</title>
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
              <LiquidacionesListResults liquidaciones={liquidaciones} handleUpdate={handleUpdate} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LiquidacionesList;
