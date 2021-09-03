/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
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

// eslint-disable-next-line react/prop-types
const EmpleadosListResults = ({ empleados, ...rest }) => {
  const [selectedEmpleadosIds, setSelectedEmpleadosIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newselectedEmpleadosIds;

    if (event.target.checked) {
      newselectedEmpleadosIds = empleados.map((empleados) => empleados.id);
    } else {
      newselectedEmpleadosIds = [];
    }

    setSelectedEmpleadosIds(newselectedEmpleadosIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedEmpleadosIds.indexOf(id);
    let newselectedEmpleadosIds = [];

    if (selectedIndex === -1) {
      newselectedEmpleadosIds = newselectedEmpleadosIds.concat(selectedEmpleadosIds, id);
    } else if (selectedIndex === 0) {
      newselectedEmpleadosIds = newselectedEmpleadosIds.concat(selectedEmpleadosIds.slice(1));
    } else if (selectedIndex === selectedEmpleadosIds.length - 1) {
      newselectedEmpleadosIds = newselectedEmpleadosIds.concat(selectedEmpleadosIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedEmpleadosIds = newselectedEmpleadosIds.concat(
        selectedEmpleadosIds.slice(0, selectedIndex),
        selectedEmpleadosIds.slice(selectedIndex + 1)
      );
    }

    setselectedEmpleadosIds(newselectedEmpleadosIds);
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
                    checked={selectedEmpleadosIds.length === empleados.length}
                    color="primary"
                    indeterminate={
                      selectedEmpleadosIds.length > 0
                      && selectedEmpleadosIds.length < empleados.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Legajo
                </TableCell>
                <TableCell>
                  Nombre Apellido
                </TableCell>
                <TableCell>
                  Cargo
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Dirección
                </TableCell>
                <TableCell>
                  Telefono
                </TableCell>
                <TableCell>
                  Fecha de ingreso
                </TableCell>
                <TableCell />

              </TableRow>
            </TableHead>
            <TableBody>
              {empleados.slice(0, limit).map((empleados) => (
                <TableRow
                  hover
                  key={empleados.id}
                  selected={selectedEmpleadosIds.indexOf(empleados.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedEmpleadosIds.indexOf(empleados.id) !== -1}
                      onChange={(event) => handleSelectOne(event, empleados.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {empleados.id}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Avatar
                        src={empleados.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(empleados.name)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {empleados.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {empleados.cargo}
                  </TableCell>
                  <TableCell>
                    {empleados.email}
                  </TableCell>
                  <TableCell>
                    {`${empleados.address.city}, ${empleados.address.state}, ${empleados.address.country}`}
                  </TableCell>
                  <TableCell>
                    {empleados.phone}
                  </TableCell>
                  <TableCell>
                    {moment(empleados.createdAt).format('DD/MM/YYYY')}
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
        count={empleados.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

EmpleadosListResults.propTypes = {
  empleados: PropTypes.array.isRequired
};

export default EmpleadosListResults;
