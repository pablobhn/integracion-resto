/* eslint-disable no-unused-vars */
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
  CircularProgress,
  Dialog,
  DialogContent,
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

// eslint-disable-next-line react/prop-types
const EmpleadosListResults = (props) => {
  const { empleados, handleUpdate } = props;
  const [loading, setLoading] = useState(false);
  const [selectedEmpleadosIds, setSelectedEmpleadosIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newselectedEmpleadosIds;

    if (event.target.checked) {
      newselectedEmpleadosIds = empleados.map((empleado) => empleado.id);
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

    setSelectedEmpleadosIds(newselectedEmpleadosIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEditar = async function (e, id) {
    setLoading(true);
    // const res = await actualizarEstado(id, 1);
    if (res) {
      setLoading(false);
      handleUpdate();
    } else {
      setLoading(false);
      alert('Ha habido un error al actualizar el estado');
    }
  };

  const handleBorrar = async function (e, id) {
    setLoading(true);
    // onst res = await actualizarEstado(id, 2);
    if (res) {
      setLoading(false);
      handleUpdate();
    } else {
      setLoading(false);
      alert('Ha habido un error al actualizar el estado');
    }
  };

  return (
    <>
      <Box>
        <Dialog
          open={loading}
          PaperProps={{
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
        >
          <DialogContent style={{ overflow: 'hidden' }}>
            <CircularProgress color="secondary" />
          </DialogContent>
        </Dialog>
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
                  placeholder="Buscar empleado"
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
                      checked={selectedEmpleadosIds.length === empleados.length}
                      color="primary"
                      indeterminate={selectedEmpleadosIds.length > 0
                        && selectedEmpleadosIds.length < empleados.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    Legajo
                  </TableCell>
                  <TableCell>
                    Nombre
                  </TableCell>
                  <TableCell>
                    Importe
                  </TableCell>
                  <TableCell>
                    Fecha
                  </TableCell>
                  <TableCell>
                    Hora
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
              { (empleados.length > 0) ? (
                <TableBody>
                  {empleados.slice((0 + page * limit), ((0 + page * limit) + limit)).map((empleado) => (
                    <TableRow
                      hover
                      key={empleado.id}
                      selected={selectedEmpleadosIds.indexOf(empleado.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedEmpleadosIds.indexOf(empleado.id) !== -1}
                          onChange={(event) => handleSelectOne(event, empleado.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        {empleado.id}
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
                            {empleado.mesa}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {`$ ${empleado.total},00`}
                      </TableCell>
                      <TableCell>
                        {moment(empleado.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        {moment(empleado.createdAt).format('hh:mm')}
                      </TableCell>
                      <TableCell>
                        {(empleado.pago.medio === 'tarjeta') ? `Tarjeta ${empleado.pago.tipo} ${empleado.pago.digitos}` : 'Efectivo'}
                      </TableCell>
                      <TableCell>
                        {
                          {
                            0: 'Pendiente',
                            1: 'Pagada',
                            2: 'Anulada'
                          }[empleado.estado]
                        }
                      </TableCell>
                      <TableCell>
                        {(empleado.estado === 0) ? (
                          <>
                            <Tooltip title="Pagada">
                              <IconButton
                                color="inherit"
                              >
                                <CheckIcon
                                  onClick={(e) => handleEditar(e, empleado.id)}
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
                                  onClick={(e) => handleBorrar(e, empleado.id)}
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
              ) : (<></>)}
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
    </>
  );
};

EmpleadosListResults.propTypes = {
  empleados: PropTypes.array.isRequired
};

export default EmpleadosListResults;
