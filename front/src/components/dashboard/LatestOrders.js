import moment from 'moment';
// import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const orders = [
  {
    id: 1001,
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'M1'
    },
    createdAt: 1555016400000,
    status: 'pendiente'
  },
  {
    id: 1002,
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'M2'
    },
    createdAt: 1555016400000,
    status: 'pendiente'
  },
  {
    id: 1003,
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'M3'
    },
    createdAt: 1554930000000,
    status: 'pendiente'
  },
  {
    id: 1004,
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'B4'
    },
    createdAt: 1554757200000,
    status: 'pagado'
  },
  {
    id: 1005,
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'M6'
    },
    createdAt: 1554670800000,
    status: 'pendiente'
  },
  {
    id: 1006,
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'B1'
    },
    createdAt: 1554670800000,
    status: 'pagado'
  }
];

const LatestOrders = (props) => (
  <Card {...props}>
    <CardHeader title="Últimos pedidos" />
    <Divider />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 10 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                #Orden
              </TableCell>
              <TableCell>
                Mesa
              </TableCell>
              <TableCell sortDirection="desc">
                <Tooltip
                  enterDelay={300}
                  title="Sort"
                >
                  <TableSortLabel
                    active
                    direction="desc"
                  >
                    Día
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>
                Estado
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow
                hover
                key={order.id}
              >
                <TableCell>
                  {order.ref}
                </TableCell>
                <TableCell>
                  {order.customer.name}
                </TableCell>
                <TableCell>
                  {moment(order.createdAt).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell>
                  <Chip
                    color="primary"
                    label={order.status}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
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

export default LatestOrders;
