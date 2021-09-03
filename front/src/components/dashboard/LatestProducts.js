import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const products = [
  {
    id: uuid(),
    name: 'Milanesa Napolitana',
    imageUrl: '/static/images/avatars/napo.jpeg',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Milanesa Fugazetta',
    imageUrl: '/static/images/avatars/fuga.jpeg',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Milanesa Cheddar y Bacon',
    imageUrl: '/static/images/avatars/cheddar.jpeg',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Milanesa 4 Quesos',
    imageUrl: '/static/images/avatars/4quesos.jpeg',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: 'Ravioles con salsa tuco',
    imageUrl: '/static/images/avatars/tuco.jpeg',
    updatedAt: moment().subtract(9, 'hours')
  }
];

const LatestProducts = (props) => (
  <Card {...props}>
    <CardHeader
      subtitle={`${products.length} en total`}
      title="Últimos productos"
    />
    <Divider />
    <List>
      {products.map((product, i) => (
        <ListItem
          divider={i < products.length - 1}
          key={product.id}
        >
          <ListItemAvatar>
            <img
              alt={product.name}
              src={product.imageUrl}
              style={{
                height: 48,
                width: 48
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary={product.name}
            secondary={`Actualizado ${product.updatedAt.fromNow()}`}
          />
          <IconButton
            edge="end"
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
      <Button
        color="primary"
        endIcon={<ArrowRightIcon />}
        size="small"
        variant="text"
      >
        VER TODOS
      </Button>
    </Box>
  </Card>
);

export default LatestProducts;
