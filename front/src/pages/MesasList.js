import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import MesaListToolbar from 'src/components/mesas/MesaListToolbar';
import MesaCard from 'src/components/mesas/MesaCard';
import { useStickyState } from '../utils/useStickyState';

const MesaList = () => {
  const [mesas, setMesas] = useStickyState([], 'mesas');

  const addMesa = () => {
    const mesa = {
      id: `M${(mesas.length + 1)}`,
      media: '/static/images/products/mesa2.png',
      title: `Mesa ${(mesas.length + 1)}`
    };
    setMesas([...mesas, { ...mesa }]);
  };

  const removeMesa = () => {
    if (mesas.length >= 1) {
      window.localStorage.removeItem(`open${mesas[mesas.length - 1].id}`);
      window.localStorage.removeItem(`productos${mesas[mesas.length - 1].id}`);
      setMesas(mesas.filter((x) => x.id !== mesas[mesas.length - 1].id));
    }
  };

  return (
    <>
      <Helmet>
        <title>Mesas | Casa Cavia</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <MesaListToolbar addMesa={addMesa} removeMesa={removeMesa} />
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {mesas.map((mesa) => (
                <Grid
                  item
                  key={mesa.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <MesaCard mesa={mesa} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
            {/* <Pagination
              color="primary"
              count={3}
              size="small"
            /> */}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MesaList;
