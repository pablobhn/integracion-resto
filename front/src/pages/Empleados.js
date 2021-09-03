import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import EmpleadosListResults from 'src/components/empleados/EmpleadosListResults';
import EmpleadosListToolbar from 'src/components/empleados/EmpleadosListToolbar';
import empleados from 'src/__mocks__/empleados';

const EmpleadosList = () => (
  <>
    <Helmet>
      <title>Empleados | Casa Cavia</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <EmpleadosListToolbar />
        <Box sx={{ pt: 3 }}>
          <EmpleadosListResults empleados={empleados} />
        </Box>
      </Container>
    </Box>
  </>
);

export default EmpleadosList;
