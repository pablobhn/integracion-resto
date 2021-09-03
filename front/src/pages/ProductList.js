/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import PlatosListResults from 'src/components/productos/PlatosListResults';
import CustomerListToolbar from 'src/components/productos/CustomerListToolbar';
import productos from 'src/__mocks__/productos';

const ProductList = () => (
  <>
    <Helmet>
      <title>Productos | Casa Cavia</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          <PlatosListResults productos={productos} />
        </Box>
      </Container>
    </Box>
  </>
);

export default ProductList;
