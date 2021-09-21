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
import EmpleadosListResults from 'src/components/empleados/EmpleadosListResults';
import { listarEmpleados } from 'src/controllers/empleados';

const EmpleadosList = () => {
  const [loading, setLoading] = useState(false);
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    async function componentDidMount() {
      setLoading(true);
      const res = await listarEmpleados();
      setEmpleados(res.data);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }

    componentDidMount();
  }, true);

  async function handleUpdate() {
    setLoading(true);
    const res = await listarEmpleados();
    setEmpleados(res.data);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }

  return (
    <>
      <Helmet>
        <title>Empleados | Casa Cavia</title>
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
              <EmpleadosListResults empleados={empleados} handleUpdate={handleUpdate} />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default EmpleadosList;
