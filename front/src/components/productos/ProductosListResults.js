/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable space-infix-ops */
/* eslint-disable react/prop-types */
import { useState, React } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  InputAdornment,
  MenuItem,
  Select,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import EditProductModal from './EditProductModal';
import { borrarProducto } from '../../controllers/productos';
import NewProductModal from './NewProductModal';
import categorias from '../../__mocks__/categorias';

const ProductosListResults = (props) => {
  const { productos, handleUpdate } = props;
  const [selectedProductosIds, setSelectedProductosIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [editProd, setEditProd] = useState({});
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);

  const handleNewProductModalOpenClickOpen = () => {
    setNewProductModalOpen(true);
  };

  const handleNewProductModalOpenClose = () => {
    setNewProductModalOpen(false);
    handleUpdate();
  };

  const handleClickOpen = (event, newProd) => {
    setEditProd(newProd);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBorrar = async function (e, id) {
    const res = await borrarProducto(id);
    if (res) {
      alert('Producto eliminado exitosamente');
      handleUpdate();
      // <Alert severity="success">This is a success alert — check it out!</Alert>
    } else {
      alert('Ha habido un error al borrar el producto!');
    }
  };

  const handleSelectAll = (event) => {
    let newSelectedProductosIds;

    if (event.target.checked) {
      newSelectedProductosIds = productos.map((prod) => prod.id);
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

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    setPage(0);
  };

  return (
    <>
      <Box>
        <Box sx={{
          mt: 1, flexDirection: 'column', display: 'flex', justifyContent: 'flex-end'
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
                  placeholder="Buscar producto"
                  variant="outlined"
                />
              </Grid>
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
                  <InputLabel id="categoria">Categoria</InputLabel>
                  <Select
                    sx={{ width: 250 }}
                    labelId="prueba-select"
                    label="Seleccione una categoría"
                    id="prueba-select-simple"
                    value={categorias.categoria}
                    onChange={(event) => handleSelectOne(event, categorias.categoria)}
                    defaultValue="categoria"
                  >
                    {categorias.map((categoria) => (
                      <MenuItem value={categoria}>
                        {categoria}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={4}
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
                  sx={{ mx: 2 }}
                  onClick={handleNewProductModalOpenClickOpen}
                >
                  Agregar Producto
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Box>
      </Box>
      <EditProductModal open={open} handleClose={handleClose} prod={editProd} />
      <NewProductModal open={newProductModalOpen} handleClose={handleNewProductModalOpenClose} />
      <Card>
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
                    Descripcion
                  </TableCell>
                  <TableCell>
                    Precio
                  </TableCell>
                  <TableCell>
                    Libre TACC
                  </TableCell>
                  <TableCell>
                    Vegano
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              { (productos.length > 0) ? (
                <TableBody>
                  {productos.slice((0 + page * limit), ((0 + page * limit) + limit)).map((prod) => (
                    <TableRow
                      hover
                      key={prod.id}
                      selected={selectedProductosIds.indexOf(prod.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedProductosIds.indexOf(prod.id) !== -1}
                          onChange={(event) => handleSelectOne(event, prod.id)}
                          value="true"
                        />
                      </TableCell>
                      <TableCell sx={{ maxWidth: '250px' }}>
                        <Box
                          sx={{
                            alignItems: 'center',
                            display: 'flex'
                          }}
                        >
                          <Avatar
                            src={prod.avatarUrl}
                            sx={{ mr: 1.25 }}
                          />
                          <Typography>
                            {prod.title}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ maxWidth: '50px' }}>
                        {prod.type}
                      </TableCell>
                      <TableCell sx={{ maxWidth: '250px' }}>
                        {prod.description}
                      </TableCell>
                      <TableCell sx={{ maxWidth: '40px' }}>
                        {'$'+ prod.price + ',00'}
                      </TableCell>
                      <TableCell sx={{ maxWidth: '30px' }}>
                        {prod.sinTac ? 'Si' : 'No'}
                      </TableCell>
                      <TableCell sx={{ maxWidth: '30px' }}>
                        {prod.vegano ? 'Si' : 'No'}
                      </TableCell>
                      <TableCell>
                        <IconButton color="inherit">
                          <EditIcon
                            onClick={(e) => handleClickOpen(e, prod)}
                            color="primary"
                            variant="dot"
                          />
                        </IconButton>
                        <IconButton color="inherit">
                          <DeleteIcon
                            onClick={(e) => handleBorrar(e, prod.id)}
                            color="primary"
                            variant="dot"
                          />
                        </IconButton>
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
          count={productos.length}
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

export default ProductosListResults;
