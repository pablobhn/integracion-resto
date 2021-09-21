import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { login } from '../controllers/users';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      <Helmet>
        <title>Login | Casa Cavia</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().max(20).required('El nombre de usuario debe tener menos de 20 caracteres'),
              password: Yup.string().max(255).required('Constraseña es requerida')
            })}
            onSubmit={async (values) => {
              setLoading(true);
              const res = await login(values);
              if (res.token) {
                localStorage.setItem('auth', res.token);
                setLoading(false);
                navigate('/app/dashboard', { replace: true });
              } else {
                setLoading(false);
                alert('Los datos de login son incorrectos');
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{
                  mb: 3, paddingTop: '80px', justifyContent: 'center', display: 'flex'
                }}
                >
                  <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h2"
                  >
                    Iniciar sesion en la plataforma
                  </Typography>
                </Box>
                <Box
                  sx={{
                    pb: 1,
                    pt: 3
                  }}
                >
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    Iniciar sesión con tu usuario
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Nombre de usuario"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Contraseña"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={loading}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    {loading ? 'Cargando...' : 'Iniciar sesión'}
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
