import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

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
        Nuevo Empleado
      </Button>
      <Button sx={{ mx: 1 }}>
        Liquidar sueldos
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
              placeholder="Buscar empleado"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default CustomerListToolbar;
