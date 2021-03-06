/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import { useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Checkbox,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Tooltip,
  SvgIcon,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import NewEmpresaModal from './NewEmpresaModal';
import EditEmpresaModal from './EditEmpresaModal';
import CuentaCorrienteModal from './CuentaCorrienteModal';

// eslint-disable-next-line react/prop-types
const EmpresasListResults = (props) => {
  const { empresas, handleUpdate } = props;
  const [loading, setLoading] = useState(false);
  const [selectedEmpresasIds, setSelectedEmpresasIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [newEmpresaModalOpen, setNewEmpresaModalOpen] = useState(false);
  const [cuentaCorrienteModalOpen, setCuentaCorrienteModalOpen] = useState(false);
  const [editEmp, setEditEmp] = useState({});
  const [open, setOpen] = useState(false);
  const [empresasFiltrados, setEmpresasFiltrados] = useState(empresas);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState();

  const handleSearch = (e) => {
    console.log(e.target.value);
    if (e.target.value === '') {
      setEmpresasFiltrados(empresas);
    } else {
      setEmpresasFiltrados(empresas.filter((emp) => emp.name.toLowerCase().match(e.target.value.toLowerCase())));
    }
  };

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

  const handleNewEmpresaModalOpenClickOpen = () => {
    setNewEmpresaModalOpen(true);
  };

  const handleNewEmpresaModalOpenClose = () => {
    setNewEmpresaModalOpen(false);
  };

  const handleNewEmpresaModalOpenCloseAndUpdate = () => {
    setNewEmpresaModalOpen(false);
    handleUpdate();
  };

  const handleSelectAll = (event) => {
    let newselectedEmpresasIds;

    if (event.target.checked) {
      newselectedEmpresasIds = empresas.map((empresa) => empresa.id);
    } else {
      newselectedEmpresasIds = [];
    }

    setSelectedEmpresasIds(newselectedEmpresasIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedEmpresasIds.indexOf(id);
    let newselectedEmpresasIds = [];

    if (selectedIndex === -1) {
      newselectedEmpresasIds = newselectedEmpresasIds.concat(selectedEmpresasIds, id);
    } else if (selectedIndex === 0) {
      newselectedEmpresasIds = newselectedEmpresasIds.concat(selectedEmpresasIds.slice(1));
    } else if (selectedIndex === selectedEmpresasIds.length - 1) {
      newselectedEmpresasIds = newselectedEmpresasIds.concat(selectedEmpresasIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newselectedEmpresasIds = newselectedEmpresasIds.concat(
        selectedEmpresasIds.slice(0, selectedIndex),
        selectedEmpresasIds.slice(selectedIndex + 1)
      );
    }

    setSelectedEmpresasIds(newselectedEmpresasIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleBorrar = async function (e, id) {
    setLoading(true);
    const res = await actualizarEstado(id, 2);
    console.log(e, id); // TODO borrar empleado
    if (res) {
      setLoading(false);
      handleUpdate();
    } else {
      setLoading(false);
      alert('Ha habido un error al actualizar el estado');
    }
  };

  const handleCuentaCorrienteModalOpen = (empresa) => {
    setEmpresaSeleccionada(empresa);
    setCuentaCorrienteModalOpen(true);
  };

  const handleCuentaCorrienteModalClose = () => {
    setCuentaCorrienteModalOpen(false);
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
        <EditEmpresaModal open={open} handleClose={handleClose} handleCloseAndUpdate={handleCloseAndUpdate} emp={editEmp} />
        <NewEmpresaModal open={newEmpresaModalOpen} handleClose={handleNewEmpresaModalOpenClose} handleCloseAndUpdate={handleNewEmpresaModalOpenCloseAndUpdate} />
        <CuentaCorrienteModal open={cuentaCorrienteModalOpen} handleClose={handleCuentaCorrienteModalClose} empresa={empresaSeleccionada} />
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
                  placeholder="Buscar empresa"
                  variant="outlined"
                  onChange={(e) => handleSearch(e)}
                />
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
                  color="primary"
                  variant="contained"
                  sx={{ mx: 1 }}
                  onClick={handleNewEmpresaModalOpenClickOpen}
                >
                  Nueva empresa
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
                      checked={selectedEmpresasIds.length === empresas.length}
                      color="primary"
                      indeterminate={selectedEmpresasIds.length > 0
                        && selectedEmpresasIds.length < empresas.length}
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>
                    ID
                  </TableCell>
                  <TableCell>
                    CUIT
                  </TableCell>
                  <TableCell>
                    Raz??n Social
                  </TableCell>
                  <TableCell>
                    Situaci??n IVA
                  </TableCell>
                  <TableCell>
                    Telefono
                  </TableCell>
                  <TableCell>
                    Cant empleados
                  </TableCell>
                  <TableCell>
                    % de bonificaci??n
                  </TableCell>
                  <TableCell>
                    Cuenta corriente
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              { (empresasFiltrados.length > 0) ? (
                <TableBody>
                  {empresasFiltrados.slice((0 + page * limit), ((0 + page * limit) + limit)).map((empresa) => (
                    <TableRow
                      hover
                      key={empresa.id}
                      selected={selectedEmpresasIds.indexOf(empresa.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedEmpresasIds.indexOf(empresa.id) !== -1}
                          onChange={(event) => handleSelectOne(event, empresa.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell>
                        {empresa.id}
                      </TableCell>
                      <TableCell>
                        {empresa.cuit}
                      </TableCell>
                      <TableCell>
                        {empresa.name}
                      </TableCell>
                      <TableCell>
                        {empresa.situacionIva}
                      </TableCell>
                      <TableCell>
                        {empresa.tel}
                      </TableCell>
                      <TableCell>
                        {empresa.empleados.length}
                      </TableCell>
                      <TableCell>
                        {empresa.descuento * 100}
                        %
                      </TableCell>
                      <TableCell
                        onClick={() => handleCuentaCorrienteModalOpen(empresa)}
                      >
                        <a href="#">{`Total $${empresa.cuentaCorriente.reduce((a, c) => a + c.montoDescuento, 0)} (ver detalle)`}</a>
                      </TableCell>
                      <TableCell sx={{ minWidth: 155 }}>
                        <Tooltip title="Editar">
                          <IconButton
                            color="inherit"
                          >
                            <EditIcon
                              onClick={(e) => handleClickOpen(e, empresa)}
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
                              onClick={(e) => handleBorrar(e, empresa.id)}
                              color="primary"
                              tooltip="anular"
                              variant="dot"
                            />
                          </IconButton>
                        </Tooltip>
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
          count={empresas.length}
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

EmpresasListResults.propTypes = {
  empresas: PropTypes.array.isRequired
};

export default EmpresasListResults;
