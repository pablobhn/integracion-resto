/* eslint-disable import/no-unresolved */
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import ProductosListResults from 'src/components/productos/ProductosListResults';
import ProductosListToolbar from 'src/components/productos/ProductosListToolbar';
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
        <ProductosListToolbar />
        <Box sx={{ pt: 3 }}>
          <ProductosListResults productos={productos} />
        </Box>
      </Container>
    </Box>
  </>
);

export default ProductList;
