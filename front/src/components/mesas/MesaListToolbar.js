/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const MesaListToolbar = (props) => {
  const { addMesa, removeMesa } = props;

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          color="primary"
          variant="contained"
          sx={{ mx: 1 }}
          onClick={addMesa}
        >
          Agregar mesa
        </Button>
        <Button
          color="secondary"
          variant="contained"
          sx={{ mx: 1 }}
          onClick={removeMesa}
        >
          Quitar mesa
        </Button>
        {/* <Button
          color="primary"
          variant="contained"
          sx={{ mx: 2 }}
        >
          Nueva Barra
        </Button> */}
      </Box>
    </Box>
  );
};

export default MesaListToolbar;
