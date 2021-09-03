import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import Login from 'src/pages/Login';

const App = () => {
  const routing = useRoutes(routes);
  const [token, setToken] = React.useState('');

  if (token === '') {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Login setToken={setToken} />
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
