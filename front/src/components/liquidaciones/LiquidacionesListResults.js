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
  Tooltip
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { actualizarEstadoLiquidacion } from '../../controllers/liquidaciones';

// eslint-disable-next-line react/prop-types
const LiquidacionesListResults = (props) => {
  const { liquidaciones, handleUpdate } = props;
  const [loading, setLoading] = useState(false);
  const [selectedLiquidacionesIds, setSelectedLiquidacionesIds] = useState([{}]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [liquidacionesFiltrados, setLiquidacionesFiltrados] = useState(liquidaciones);

  const handleSearch = (e) => {
    console.log(e.target.value);
    if (e.target.value === '') {
      setLiquidacionesFiltrados(liquidaciones);
    } else {
      setLiquidacionesFiltrados(liquidaciones.filter((liq) => liq.empleado.toLowerCase().match(e.target.value.toLowerCase())));
    }
  };

  const handleSelectAll = (event) => {
    let newselectedLiquidacionesIds;

    if (event.target.checked) {
      newselectedLiquidacionesIds = liquidaciones.map((liquidacion) => liquidacion.id);
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

    setSelectedLiquidacionesIds(newselectedLiquidacionesIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handlePagar = async function (e, id) {
    setLoading(true);
    const res = await actualizarEstadoLiquidacion(id, 1);
    if (res) {
      setLoading(false);
      handleUpdate();
    } else {
      setLoading(false);
      alert('Ha habido un error al actualizar el estado');
    }
  };

  const handleAnular = async function (e, id) {
    setLoading(true);
    const res = await actualizarEstadoLiquidacion(id, 2);
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
    selectedLiquidacionesIds.map(async (id) => {
      responses.push(actualizarEstadoLiquidacion(id, 2));
    });

    const values = await Promise.all(responses);
    if (values) {
      setLoading(false);
      handleUpdate();
      alert('Se ha actualizado el estado de las liquidaciones seleccionadas');
    } else {
      setLoading(false);
      alert('Ha habido un error al actualizar el estado');
    }
  };

  const handleAnularSelected = async function () {
    setLoading(true);
    const responses = [Promise];
    selectedLiquidacionesIds.map(async (id) => {
      responses.push(actualizarEstadoLiquidacion(id, 2));
    });

    const values = await Promise.all(responses);
    if (values) {
      setLoading(false);
      handleUpdate();
      alert('Se ha actualizado el estado de las liquidaciones seleccionadas');
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
                  placeholder="Buscar liquidación por empleado"
                  variant="outlined"
                  onChange={(e) => handleSearch(e)}
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
                      checked={selectedLiquidacionesIds.length === liquidaciones.length}
                      color="primary"
                      indeterminate={selectedLiquidacionesIds.length > 0
                        && selectedLiquidacionesIds.length < liquidaciones.length}
                      onChange={handleSelectAll}
                      disabled="true"
                    />
                  </TableCell>
                  <TableCell>
                    #
                  </TableCell>
                  <TableCell>
                    Empleado
                  </TableCell>
                  <TableCell>
                    Legajo
                  </TableCell>
                  <TableCell>
                    Período
                  </TableCell>
                  <TableCell>
                    Importe
                  </TableCell>
                  <TableCell>
                    Estado
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              { (liquidacionesFiltrados.length > 0) ? (
                <TableBody>
                  {liquidacionesFiltrados.slice((0 + page * limit), ((0 + page * limit) + limit)).map((liquidacion) => (
                    <TableRow
                      hover
                      key={liquidacion.id}
                      selected={selectedLiquidacionesIds.indexOf(liquidacion.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedLiquidacionesIds.indexOf(liquidacion.id) !== -1}
                          onChange={(event) => handleSelectOne(event, liquidacion.id)}
                          value="true"
                          disabled={(liquidacion.status !== 0)}
                        />
                      </TableCell>
                      <TableCell>
                        {liquidacion.id}
                      </TableCell>
                      <TableCell>
                        {liquidacion.empleado}
                      </TableCell>
                      <TableCell>
                        {liquidacion.legajo}
                      </TableCell>
                      <TableCell>
                        {`$ ${liquidacion.total},00`}
                      </TableCell>
                      <TableCell>
                        {moment(liquidacion.periodo).format('MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        {
                        {
                          0: 'Pendiente',
                          1: 'Pagada',
                          2: 'Anulada'
                        }[liquidacion.status]
                      }
                      </TableCell>
                      <TableCell>
                        {(liquidacion.status === 0) ? (
                          <>
                            <Tooltip title="Pagada">
                              <IconButton
                                color="inherit"
                              >
                                <CheckCircleOutlineIcon
                                  onClick={(e) => handlePagar(e, liquidacion.id)}
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
                                  onClick={(e) => handleAnular(e, liquidacion.id)}
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
          count={liquidaciones.length}
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

LiquidacionesListResults.propTypes = {
  liquidaciones: PropTypes.array.isRequired
};

export default LiquidacionesListResults;
