import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button
} from '@material-ui/core';
// eslint-disable-next-line import/no-unresolved
import getInitials from 'src/utils/getInitials';

const ProductosListResults = ({ productos, ...rest }) => {
  const [selectedProductosIds, setSelectedProductosIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedProductosIds;

    if (event.target.checked) {
      newSelectedProductosIds = productos.map((customer) => customer.id);
    } else {
      newSelectedProductosIds = [];
    }

    setSelectedProductosIds(newSelectedProductosIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedProductosIds.indexOf(id);
    let newSelectedProductosIds = [];

    if (selectedIndex === -1) {
      newSelectedProductosIds = newSelectedProductosIds.concat(selectedProductosIds, id);
    } else if (selectedIndex === 0) {
      newSelectedProductosIds = newSelectedProductosIds.concat(selectedProductosIds.slice(1));
    } else if (selectedIndex === selectedProductosIds.length - 1) {
      newSelectedProductosIds = newSelectedProductosIds.concat(selectedProductosIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedProductosIds = newSelectedProductosIds.concat(
        selectedProductosIds.slice(0, selectedIndex),
        selectedProductosIds.slice(selectedIndex + 1)
      );
    }

    setSelectedProductosIds(newSelectedProductosIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedProductosIds.length === productos.length}
                    color="primary"
                    indeterminate={
                      selectedProductosIds.length > 0
                      && selectedProductosIds.length < productos.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Producto
                </TableCell>
                <TableCell>
                  Categoria
                </TableCell>
                <TableCell>
                  Precio
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedProductosIds.indexOf(customer.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedProductosIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell sx={{ maxWidth: '120px' }}>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={customer.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(customer.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {customer.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ maxWidth: '50px' }}>
                    {customer.categoria}
                  </TableCell>
                  <TableCell>
                    {customer.precio}
                  </TableCell>
                  <TableCell>
                    <Button>
                      Editar
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={productos.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ProductosListResults.propTypes = {
  productos: PropTypes.array.isRequired
};

export default ProductosListResults;
