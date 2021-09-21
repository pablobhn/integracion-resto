/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  Grid,
  Checkbox,
  IconButton,
  InputAdornment,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckIcon from '@material-ui/icons/Check';
import { actualizarEstado } from '../../controllers/ventas';

// eslint-disable-next-line react/prop-types
const VentasListResults = (props) => {
  const { ventas, handleUpdate } = props;
  const [selectedVentasIds, setSelectedVentasIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newselectedVentasIds;

    if (event.target.checked) {
      newselectedVentasIds = ventas.map((venta) => venta.id);
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

  const handlePagar = async function (e, id) {
    const res = await actualizarEstado(id, 1);
    if (res) {
      handleUpdate();
    } else {
      alert('Ha habido un error al actualizar el estado');
    }
  };

  const handleAnular = async function (e, id) {
    const res = await actualizarEstado(id, 2);
    if (res) {
      handleUpdate();
    } else {
      alert('Ha habido un error al actualizar el estado');
    }
  };

  return (
    <>
      <Box>
        <Box sx={{
          mt: 3, flexDirection: 'column', display: 'flex'
        }}
        >
          <Card>
            <Grid container>
              <Grid
                item
                xs={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  direction: 'row',
                  p: 2
                }}
              >
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
              </Grid>
              <Grid
                item
                xs={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                  direction: 'row',
                  p: 3
                }}
              >
                <Button sx={{ mx: 2 }}>
                  Anular
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ mx: 2 }}
                >
                  Pagado
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedVentasIds.length === ventas.length}
                      color="primary"
                      indeterminate={selectedVentasIds.length > 0
                        && selectedVentasIds.length < ventas.length}
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
                {ventas.slice((0 + page * limit), ((0 + page * limit) + limit)).map((venta) => (
                  <TableRow
                    hover
                    key={venta.id}
                    selected={selectedVentasIds.indexOf(venta.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedVentasIds.indexOf(venta.id) !== -1}
                        onChange={(event) => handleSelectOne(event, venta.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      {venta.id}
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
                          {venta.mesa}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {`$ ${venta.total},00`}
                    </TableCell>
                    <TableCell>
                      {moment(venta.createdAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      {(venta.pago.medio === 'tarjeta') ? `Tarjeta ${venta.pago.tipo} ${venta.pago.digitos}` : 'Efectivo'}
                    </TableCell>
                    <TableCell>
                      {
                        {
                          0: 'Pendiente',
                          1: 'Pagada',
                          2: 'Anulada'
                        }[venta.estado]
                      }
                    </TableCell>
                    <TableCell>
                      {(venta.estado === 0) ? (
                        <>
                          <Tooltip title="Pagada">
                            <IconButton
                              color="inherit"
                            >
                              <CheckIcon
                                onClick={(e) => handlePagar(e, venta.id)}
                                color="primary"
                                tooltip="pagada"
                                variant="dot"
                              />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Anular">
                            <IconButton
                              color="inherit"
                            >
                              <CancelIcon
                                onClick={(e) => handleAnular(e, venta.id)}
                                color="primary"
                                tooltip="anular"
                                variant="dot"
                              />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <></>
                      )}
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
    </>
  );
};

VentasListResults.propTypes = {
  ventas: PropTypes.array.isRequired
};

export default VentasListResults;
