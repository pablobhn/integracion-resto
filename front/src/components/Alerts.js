/* eslint-disable react/prop-types */
import React from 'react';
import { Stack, Snackbar, Alert } from '@material-ui/core';

export function SuccessAlert(props) {
  const { open, setOpen, alertMessage } = props;
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar sx={{ minWidth: '500px' }} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={100}>
        <Alert onClose={() => { setOpen(false); }} severity="success" sx={{ width: '100%' }}>
          {' '}
          {alertMessage}
          {' '}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export function ErrorAlert(props) {
  const { open, setOpen, alertMessage } = props;
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar sx={{ minWidth: '500px' }} open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => { setOpen(false); }} severity="error" sx={{ width: '100%' }}>
          {' '}
          {alertMessage}
          {' '}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default SuccessAlert;
