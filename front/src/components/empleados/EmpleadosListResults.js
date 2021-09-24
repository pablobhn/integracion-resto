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
import AlarmIcon from '@material-ui/icons/Alarm';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import ModalHoras from './ModalHoras';
import NewEmpleadoModal from './NewEmpleadoModal';
import EditEmpleadoModal from './EditEmpleadoModal';

// eslint-disable-next-line react/prop-types
const EmpleadosListResults = (props) => {
  const { empleados, handleUpdate } = props;
  const [loading, setLoading] = useState(false);
  const [selectedEmpleadosIds, setSelectedEmpleadosIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [modalHorasOpen, setModalHorasOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
  const [newEmpleadoModalOpen, setNewEmpleadoModalOpen] = useState(false);
  const [editEmp, setEditEmp] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = (event, newEmp) => {
    setEditEmp(newEmp);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseAndUpdate = () => {
    setOpen(false);
    handleUpdate();
  };

  const handleNewEmpleadoModalOpenClickOpen = () => {
    setNewEmpleadoModalOpen(true);
  };

  const handleNewEmpleadoModalOpenClose = () => {
    setNewEmpleadoModalOpen(false);
  };

  const handleNewEmpleadoModalOpenCloseAndUpdate = () => {
    setNewEmpleadoModalOpen(false);
    handleUpdate();
  };

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

  const handleBorrar = async function (e, id) {
    setLoading(true);
    // onst res = await actualizarEstado(id, 2);
    console.log(e, id); // TODO borrar empleado
    if (res) {
      setLoading(false);
      handleUpdate();
    } else {
      setLoading(false);
      alert('Ha habido un error al actualizar el estado');
    }
  };

  const handleOpenModalHoras = async function (e, id) {
    setSelectedId(id);
    setModalHorasOpen(true);
  };

  const handleCloseModalHoras = () => {
    setModalHorasOpen(false);
  };

  const isCurrentMonth = (fecha) => {
    const currentdate = new Date();
    const month = currentdate.getMonth() + 1;
    const year = currentdate.getFullYear();

    return ((parseInt(moment(fecha).format('YYYY'), 10) === year) && (parseInt(moment(fecha).format('MM'), 10) === month));
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
        <ModalHoras open={modalHorasOpen} handleClose={handleCloseModalHoras} id={selectedId} handleUpdate={handleUpdate} />
        <EditEmpleadoModal open={open} handleClose={handleClose} handleCloseAndUpdate={handleCloseAndUpdate} emp={editEmp} />
        <NewEmpleadoModal open={newEmpleadoModalOpen} handleClose={handleNewEmpleadoModalOpenClose} handleCloseAndUpdate={handleNewEmpleadoModalOpenCloseAndUpdate} />
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
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ mx: 1 }}
                  onClick={handleNewEmpleadoModalOpenClickOpen}
                >
                  Nuevo empleado
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ mx: 1 }}
                >
                  Liquidar sueldos
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
                    Tel
                  </TableCell>
                  <TableCell>
                    Dirección
                  </TableCell>
                  <TableCell>
                    Fecha de nacimiento
                  </TableCell>
                  <TableCell>
                    Fecha de ingreso
                  </TableCell>
                  <TableCell sx={{ maxWidth: 160 }}>
                    Hs Extra / Faltas (mes en curso)
                  </TableCell>
                  <TableCell>
                    Regimen
                  </TableCell>
                  <TableCell />
                  <TableCell />
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
                        {empleado.name}
                      </TableCell>
                      <TableCell>
                        {empleado.tel}
                      </TableCell>
                      <TableCell>
                        {empleado.address}
                      </TableCell>
                      <TableCell>
                        {moment(empleado.fechaNacimiento).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        {moment(empleado.fechaIngreso).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>
                        {`${empleado.horasExtra.reduce((a, c) => a + (isCurrentMonth(c.fecha) ? c.horas : 0), 0)} / ${empleado.faltas.reduce((a, c) => a + (isCurrentMonth(c.fecha) ? c.horas : 0), 0)}`}
                      </TableCell>
                      <TableCell>
                        {(empleado.horasBase === 160) ? 'Fulltime' : `${empleado.horasBase} hs`}
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
                      <TableCell sx={{ minWidth: 155 }}>
                        <Tooltip title="Registrar faltas/hs extra">
                          <IconButton
                            color="inherit"
                          >
                            <AlarmIcon
                              onClick={(e) => handleOpenModalHoras(e, empleado.id)}
                              color="primary"
                              tooltip="pagada"
                              variant="dot"
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                          <IconButton
                            color="inherit"
                          >
                            <EditIcon
                              onClick={(e) => handleClickOpen(e, empleado)}
                              color="primary"
                              tooltip="pagada"
                              variant="dot"
                            />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Borrar">
                          <IconButton
                            color="inherit"
                          >
                            <DeleteIcon
                              onClick={(e) => handleBorrar(e, empleado.id)}
                              color="primary"
                              tooltip="anular"
                              variant="dot"
                            />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell />
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
