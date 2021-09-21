import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import Registracion from '../components/registracion/Registracion';

const VentasList = () => (
  <>
    <Helmet>
      <title>Registracion | Casa Cavia</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%'
      }}
    >
      <Container maxWidth={false}>
        <Box>
          <Registracion />
        </Box>
      </Container>
    </Box>
  </>
);

export default VentasList;
