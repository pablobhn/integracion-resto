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
  Button,
  CardContent,
  InputAdornment,
  SvgIcon,
  TextField,
  IconButton,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
// import { EditNotifications } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
// eslint-disable-next-line import/no-unresolved
// import getInitials from 'src/utils/getInitials';

// eslint-disable-next-line react/prop-types
const LiquidacionesListResults = ({ liquidaciones, ...rest }) => {
  const [selectedLiquidacionesIds, setSelectedLiquidacionesIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newselectedLiquidacionesIds;

    if (event.target.checked) {
      newselectedLiquidacionesIds = liquidaciones.map((liquidaciones) => liquidaciones.id);
    } else {
      newselectedLiquidacionesIds = [];
    }

    setSelectedLiquidacionesIds(newselectedLiquidacionesIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedLiquidacionesIds.indexOf(id);
    let newselectedLiquidacionesIds = [];

    if (selectedIndex === -1) {
      newselectedLiquidacionesIds = newselectedLiquidacionesIds.concat(selectedLiquidacionesIds, id);
    } else if (selectedIndex === 0) {
      newselectedLiquidacionesIds = newselectedLiquidacionesIds.concat(selectedLiquidacionesIds.slice(1));
    } else if (selectedIndex === selectedLiquidacionesIds.length - 1) {
      newselectedLiquidacionesIds = newselectedLiquidacionesIds.concat(selectedLiquidacionesIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedLiquidacionesIds = newselectedLiquidacionesIds.concat(
        selectedLiquidacionesIds.slice(0, selectedIndex),
        selectedLiquidacionesIds.slice(selectedIndex + 1)
      );
    }

    setselectedLiquidacionesIds(newselectedLiquidacionesIds);
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
        <Box sx={{
          mt: 3, flexDirection: 'column', display: 'flex', justifyContent: 'flex-end'
        }}
        >
          <Card>
            <CardContent sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Buscar venta"
                  variant="outlined"
                />
              </Box>
              <Button
                color="primary"
                variant="contained"
              >
                Anular
              </Button>
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedLiquidacionesIds.length === liquidaciones.length}
                    color="primary"
                    indeterminate={
                      selectedLiquidacionesIds.length > 0
                      && selectedLiquidacionesIds.length < liquidaciones.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  #ID
                </TableCell>
                <TableCell>
                  Empleado
                </TableCell>
                <TableCell>
                  Importe
                </TableCell>
                <TableCell>
                  Periodo
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
              {liquidaciones.slice((0 + page * limit), ((0 + page * limit) + limit)).map((liquidaciones) => (
                <TableRow
                  hover
                  key={liquidaciones.id}
                  selected={selectedLiquidacionesIds.indexOf(liquidaciones.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedLiquidacionesIds.indexOf(liquidaciones.id) !== -1}
                      onChange={(event) => handleSelectOne(event, liquidaciones.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    {liquidaciones.id}
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
                        {liquidaciones.mesa}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {liquidaciones.importe}
                  </TableCell>
                  <TableCell>
                    {moment(liquidaciones.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    Tarjeta de crédito
                  </TableCell>
                  <TableCell>
                    {liquidaciones.estado}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="inherit"
                    >
                      <EditIcon
                        color="primary"
                        variant="dot"
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={liquidaciones.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

LiquidacionesListResults.propTypes = {
  Liquidaciones: PropTypes.array.isRequired
};

export default LiquidacionesListResults;
