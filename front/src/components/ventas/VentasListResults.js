/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
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
// import getInitials from 'src/utils/getInitials';

// eslint-disable-next-line react/prop-types
const VentasListResults = ({ ventas, ...rest }) => {
  const [selectedVentasIds, setSelectedVentasIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newselectedVentasIds;

    if (event.target.checked) {
      newselectedVentasIds = ventas.map((ventas) => ventas.id);
    } else {
      newselectedVentasIds = [];
    }

    setSelectedVentasIds(newselectedVentasIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedVentasIds.indexOf(id);
    let newselectedVentasIds = [];

    if (selectedIndex === -1) {
      newselectedVentasIds = newselectedVentasIds.concat(selectedVentasIds, id);
    } else if (selectedIndex === 0) {
      newselectedVentasIds = newselectedVentasIds.concat(selectedVentasIds.slice(1));
    } else if (selectedIndex === selectedVentasIds.length - 1) {
      newselectedVentasIds = newselectedVentasIds.concat(selectedVentasIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedVentasIds = newselectedVentasIds.concat(
        selectedVentasIds.slice(0, selectedIndex),
        selectedVentasIds.slice(selectedIndex + 1)
      );
    }

    setSelectedVentasIds(newselectedVentasIds);
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
                    checked={selectedVentasIds.length === ventas.length}
                    color="primary"
                    indeterminate={
                      selectedVentasIds.length > 0
                      && selectedVentasIds.length < ventas.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  #Venta
                </TableCell>
                <TableCell>
                  Mesa
                </TableCell>
                <TableCell>
                  Importe
                </TableCell>
                <TableCell>
                  Fecha
                </TableCell>
                <TableCell>
                  Medio de pago
                </TableCell>
                <TableCell>
                  Estado
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {ventas.slice(0, limit).map((ventas) => (
                <TableRow
                  hover
                  key={ventas.id}
                  selected={selectedVentasIds.indexOf(ventas.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedVentasIds.indexOf(ventas.id) !== -1}
                      onChange={(event) => handleSelectOne(event, ventas.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {ventas.id}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {ventas.mesa}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {ventas.importe}
                  </TableCell>
                  <TableCell>
                    {moment(ventas.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    Tarjeta de crédito
                  </TableCell>
                  <TableCell>
                    {ventas.estado}
                  </TableCell>
                  <TableCell>
                    <Button
                      color="primary"
                      variant="contained"
                    >
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
        count={ventas.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

VentasListResults.propTypes = {
  ventas: PropTypes.array.isRequired
};

export default VentasListResults;
