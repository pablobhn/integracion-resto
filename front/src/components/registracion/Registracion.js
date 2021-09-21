/* eslint-disable no-unused-vars */
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Field, Formik, FormikProvider } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import roles from '../../__mocks__/roles';

const Registracion = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Registración | Casa Cavia</title>
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
              firstName: '',
              lastName: '',
              password: '',
              role: 'Usuario',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Debe ser un email válido').max(255).required('Email es requerido'),
                firstName: Yup.string().max(255).required('Nombre es requerido'),
                lastName: Yup.string().max(255).required('Apellido es requerido'),
                password: Yup.string().max(255).required('Constraseña es requerida'),
                policy: Yup.boolean().oneOf([true], 'Este campo debe ser tildado')
              })
            }
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3, paddingTop: '80px' }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Crear un nuevo usuario
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Utiliza un email para crear una nueva cuenta
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="Nombre"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Apellido"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Correo electrónico"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
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
                <Typography>
                  Rol
                </Typography>
                <Field
                  as="select"
                  placeholder="rol"
                  onChange={handleChange}
                  style={{
                    height: 50, width: '100%', padding: '10px', 'margin-bottom': '15px'
                  }}
                  value={values.type}
                >
                  {roles.map((rol) => (
                    <option value={rol}>
                      {rol}
                    </option>
                  ))}
                </Field>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Registrar
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

export default Registracion;
