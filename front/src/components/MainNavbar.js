import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Logo from './Logo';

const MainNavbar = (props) => (
  <AppBar
    elevation={0}
    {...props}
  >
    <Toolbar sx={{ height: 80, flexDirection: 'row' }}>
      <RouterLink to="/">
        <div>
          <div>
            <Logo />
          </div>
          {/* <div>
            <Typography
              variant="h2"
              color="white"
            >
              Restaurante Lo de Cacho
            </Typography>
          </div> */}
        </div>
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
