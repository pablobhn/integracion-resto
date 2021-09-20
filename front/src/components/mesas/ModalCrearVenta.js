/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  InputLabel,
  FormControl,
  Select,
  Tab,
  Tabs,
  Typography
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

const ModalCrearVenta = (props) => {
  const {
    open,
    handleClose,
    setMesaOpen,
    productos,
    mesa
  } = props;
  const [loading, setLoading] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function TabPanel(props) {
    const {
      children, value, index, ...other
    } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      { loading ? (
        <CircularProgress />
      ) : (
        <div>
          <AppBar
            position="static"
            color="default"
            sx={{
              minWidth: '500px'
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis="x"
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir="lft">
              Item One
            </TabPanel>
            <TabPanel value={value} index={1} dir="lft">
              Item Two
            </TabPanel>
          </SwipeableViews>
          <Box
            sx={{
              display: 'flex', flexDirection: 'row', justifyContent: 'right', p: 2
            }}
          >
            <Button onClick={handleClose} color="secondary" sx={{ px: 1 }}>
              Cancelar
            </Button>
            <Button onClick={handleClose} color="primary" variant="contained" sx={{ px: 1 }}>
              Subscribe
            </Button>
          </Box>
        </div>
      )}
    </Dialog>
  );
};

export default ModalCrearVenta;
