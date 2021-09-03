import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import VentasListResults from 'src/components/ventas/VentasListResults';
import VentasListToolbar from 'src/components/ventas/VentasListToolbar';
import ventas from 'src/__mocks__/ventas';

const VentasList = () => (
  <>
    <Helmet>
      <title>Ventas | Casa Cavia</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <VentasListToolbar />
        <Box sx={{ pt: 3 }}>
          <VentasListResults ventas={ventas} />
        </Box>
      </Container>
    </Box>
  </>
);

export default VentasList;
