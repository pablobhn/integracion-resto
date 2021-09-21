/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import LiquidacionesListResults from 'src/components/liquidaciones/LiquidacionesListResults';
import liquidaciones from 'src/__mocks__/liquidaciones';

const LiquidacionesList = () => (
  <>
    <Helmet>
      <title>Liquidaciones | Casa Cavia</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <LiquidacionesListResults liquidaciones={liquidaciones} />
        </Box>
      </Container>
    </Box>
  </>
);

export default LiquidacionesList;
