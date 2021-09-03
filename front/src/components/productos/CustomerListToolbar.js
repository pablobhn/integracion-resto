import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const handleChange = (event) => {
  // eslint-disable-next-line no-undef
  setAge(event.target.value);
};

const CustomerListToolbar = (props) => (
  <Box {...props}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        direction: 'row'
      }}
    >
      {/* <Button>
        Import
      </Button> */}

      <Button
        color="primary"
        variant="contained"
      >
        Agregar Producto
      </Button>
      <Button sx={{ mx: 1 }}>
        Eliminar Producto
      </Button>
    </Box>
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
              placeholder="Buscar producto"
              variant="outlined"
            />
          </Box>
          <Box sx={{
            alignItems: 'center', flexDirection: 'row', display: 'flex', justifyContent: ''
          }}
          >
            <InputLabel sx={{ alignSelf: 'center' }} id="prueba-select">
              Categoria
            </InputLabel>
            <Select
              labelId="prueba-select"
              id="prueba-select-simple"
              value="age"
              onChange={handleChange}
            >
              <MenuItem>Entrada</MenuItem>
              <MenuItem>Plato Principal</MenuItem>
              <MenuItem>Postre</MenuItem>
              <MenuItem>Bebida</MenuItem>
            </Select>
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default CustomerListToolbar;
