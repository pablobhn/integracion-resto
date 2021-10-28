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
import EmpresasListResults from 'src/components/empresas/EmpresasListResults';
import { listarEmpresas } from 'src/controllers/empresas';

const EmpresasList = () => {
  const [loading, setLoading] = useState(false);
  const [empresas, setEmpresas] = useState([]);

  useEffect(() => {
    async function componentDidMount() {
      setLoading(true);
      const res = await listarEmpresas();
      setEmpresas(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }

    componentDidMount();
  }, true);

  async function handleUpdate() {
    setLoading(true);
    const res = await listarEmpresas();
    setEmpresas(res.data);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }

  return (
    <>
      <Helmet>
        <title>Empresas | Casa Cavia</title>
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
              <EmpresasListResults empresas={empresas} handleUpdate={handleUpdate} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default EmpresasList;
