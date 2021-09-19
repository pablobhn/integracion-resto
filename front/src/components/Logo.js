import { Typography } from '@material-ui/core';

const Logo = (props) => (
  <div>
    <img
      alt="Logo"
      src="\static\restaurante.png"
      width="50"
      height="50"
      {...props}
    />
    <Typography
      variant="h2"
      color="white"
      style={{ display: 'inline-block' }}
    >
      Restaurante Casa Cavia
    </Typography>
  </div>
);

export default Logo;
