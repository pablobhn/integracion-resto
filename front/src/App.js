/* eslint-disable import/no-unresolved */
import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import GlobalStyles from 'src/components/GlobalStyles';
import { ThemeProvider } from '@material-ui/core';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import { routes, noLogin } from 'src/routes';
import { useRoutes } from 'react-router-dom';

function usePrivateRoutes(r) {
  const token = localStorage.getItem('auth');
  if (token) {
    return useRoutes(r);
  }
  return useRoutes(noLogin);
}

const App = () => {
  const routing = usePrivateRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
