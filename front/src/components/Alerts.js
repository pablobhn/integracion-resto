import React, { useState } from 'react';
import { Stack, Snackbar, Alert } from '@material-ui/core';

export function showSuccess(message) {
  const [open, setOpen] = useState(true);
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={100}>
        <Alert onClose={() => { setOpen(false); }} severity="success" sx={{ width: '100%' }}>
          {' '}
          {message}
          {' '}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export function showError(message) {
  const [open, setOpen] = useState(true);
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={100}>
        <Alert onClose={() => { setOpen(false); }} severity="success" sx={{ width: '100%' }}>
          {' '}
          {message}
          {' '}
        </Alert>
      </Snackbar>
    </Stack>
  );
}

export default showSuccess;
