import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import PlatosListResults from 'src/components/productos/PlatosListResults';
import CustomerListToolbar from 'src/components/productos/CustomerListToolbar';
import customers from 'src/__mocks__/comida';

const CustomerList = () => (
  <>
    <Helmet>
      <title>Customers | Material Kit</title>
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
          <PlatosListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default CustomerList;
