/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
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
  Checkbox,
  Dialog,
  DialogContent,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  Select
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { actualizarEstado } from '../../controllers/ventas';
import ModalPagar from './ModalPagar';
import { SuccessAlert, ErrorAlert } from '../Alerts';

// eslint-disable-next-line react/prop-types
const VentasListResults = (props) => {
  const { ventas, handleUpdate } = props;
  const [loading, setLoading] = useState(false);
  const [selectedVentasIds, setSelectedVentasIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [ventasFiltradas, setVentasFiltradas] = useState(ventas);
  const [openModalPagar, setOpenModalPagar] = useState(false);
  const [venta, setVenta] = useState();
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  const handleFilterEstado = (e) => {
    console.log(e.target.value);
    if (e.target.value === 3) {
      setVentasFiltradas(ventas);
    } else {
      setVentasFiltradas(ventas.filter((ventas) => ventas.estado === e.target.value));
    }
  };

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

  // const handlePagar = async function (e, id) {
  //   setLoading(true);
  //   const res = await actualizarEstado(id, 1);
  //   if (res) {
  //     setLoading(false);
  //     handleUpdate();
  //   } else {
  //     setLoading(false);
  //     alert('Ha habido un error al actualizar el estado');
  //   }
  // };

  const handleOpenModalPagar = (e, venta) => {
    setVenta(venta);
    setOpenModalPagar(true);
  };

  const handleCloseModalPagar = () => {
    setOpenModalPagar(false);
  };

  const handleAnular = async function () {
    setLoading(true);
    const res = [];

    selectedVentasIds.map(async (id) => {
      const response = await actualizarEstado(id, 2);
      res.push(response);
    });

    if (res) {
      setLoading(false);
      handleUpdate();
    } else {
      setLoading(false);
      alert('Ha habido un error al actualizar el estado');
    }
  };

  const handlePagarSelected = async function () {
    setLoading(true);
    const responses = [Promise];
    selectedVentasIds.map(async (id) => {
      responses.push(actualizarEstado(id, 1));
    });

    const values = await Promise.all(responses);
    if (values) {
      setLoading(false);
      handleUpdate();
      alert('Se ha actualizado el estado de las ventas seleccionadas');
    } else {
      setLoading(false);
      alert('Ha habido un error al actualizar el estado');
    }
  };

  const handleAnularSelected = async function () {
    setLoading(true);
    const responses = [Promise];
    selectedVentasIds.map(async (id) => {
      responses.push(actualizarEstado(id, 2));
    });

    const values = await Promise.all(responses);
    if (values) {
      setLoading(false);
      handleUpdate();
      alert('Se ha actualizado el estado de las ventas seleccionadas');
    } else {
      setLoading(false);
      alert('Ha habido un error al actualizar el estado');
    }
  };

  return (
    <>
      <Dialog
        open={openModalPagar}
        onClose={handleCloseModalPagar}
        aria-labelledby="responsive-dialog-title"
      >
        <SuccessAlert open={successAlertOpen} setOpen={setSuccessAlertOpen} alertMessage="El pago se ha registrado correctamente" />
        <ErrorAlert open={errorAlertOpen} setOpen={setErrorAlertOpen} alertMessage="Ha habido un error al registrar el pago" />
        <ModalPagar setErrorAlertOpen={setErrorAlertOpen} setSuccessAlertOpen={setSuccessAlertOpen} handleClose={handleCloseModalPagar} handleUpdate={handleUpdate} venta={venta} />
      </Dialog>
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
                xs={4}
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  direction: 'row',
                  p: 2
                }}
              >
                <FormControl>
                  <InputLabel id="estado">Estado</InputLabel>
                  <Select
                    sx={{ width: 250 }}
                    labelId="prueba-select"
                    label="Seleccione un estado"
                    id="prueba-select-simple"
                    onChange={(event) => handleFilterEstado(event)}
                    defaultValue="Todos los estados"
                  >
                    <MenuItem value={0}>
                      Pendiente
                    </MenuItem>
                    <MenuItem value={1}>
                      Pagada
                    </MenuItem>
                    <MenuItem value={2}>
                      Anulada
                    </MenuItem>
                    <MenuItem value={3}>
                      Todos los estados
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  display: 'flex',
                  justifyContent: 'right',
                  direction: 'row',
                  p: 3
                }}
              >
                <Button
                  onClick={handleAnularSelected}
                  sx={{ mx: 2 }}
                >
                  Anular
                </Button>
                <Button
                  onClick={handlePagarSelected}
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
                      disabled="true"
                    />
                  </TableCell>
                  <TableCell>
                    #
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
                    Hora
                  </TableCell>
                  <TableCell>
                    Bonificación empresa
                  </TableCell>
                  <TableCell>
                    Medio de pago
                  </TableCell>
                  <TableCell>
                    Cod. Autorización
                  </TableCell>
                  <TableCell>
                    Estado
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              { (ventasFiltradas.length > 0) ? (
                <TableBody>
                  {ventasFiltradas.slice((0 + page * limit), ((0 + page * limit) + limit)).map((venta) => (
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
                          disabled={(venta.estado !== 0)}
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
                        {moment(venta.createdAt).format('hh:mm')}
                      </TableCell>
                      <TableCell>
                        {venta.pago.descuento ? (`${venta.pago.descuento * 100}%`) : '-'}
                      </TableCell>
                      <TableCell>
                        {(venta.pago.medio === 'Tarjeta') ? `TC - ${venta.pago.tipo} - ${venta.pago.digitos.substring(1, 5)}` : venta.pago.medio}
                      </TableCell>
                      <TableCell>
                        {venta.pago.autorizacion ? String(venta.pago.autorizacion).substring(17, 23) : '-'}
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
                                <CheckCircleOutlineIcon
                                  onClick={(e) => handleOpenModalPagar(e, venta)}
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
              ) : (<></>)}
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
