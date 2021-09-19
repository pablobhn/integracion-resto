/* eslint-disable react/jsx-one-expression-per-line */
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import Logo from './Logo';

const MainNavbar = (props) => (
  <AppBar
    elevation={0}
    {...props}
  >
    <Toolbar sx={{ height: 90, flexDirection: 'row', paddingTop: '10px' }}>
      <RouterLink to="/">
        <div>
          <div>
            <Logo />
          </div>
        </div>
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
