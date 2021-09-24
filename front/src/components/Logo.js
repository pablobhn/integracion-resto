import { Typography, Grid } from '@material-ui/core';

const Logo = (props) => (
  <Grid
    container
    justifyContent="center"
    alignItems="center"
  >
    <Grid
      item
    >
      <img
        alt="Logo"
        src="\static\restaurante.png"
        width="50"
        height="50"
        {...props}
      />
    </Grid>
    <Grid
      item
      display="inline"
    >
      <Typography
        variant="h2"
        color="white"
        sx={{ pl: 3 }}
      >
        Restaurante Casa Cavia
      </Typography>
    </Grid>
  </Grid>
);

export default Logo;
