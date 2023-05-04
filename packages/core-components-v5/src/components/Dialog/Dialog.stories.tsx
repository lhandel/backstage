/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material/styles';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: Theme) => ({
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

export default {
  title: 'Layout/Dialog',
  component: Dialog,
};

export const Default = () => {
  const [open, setOpen] = useState(false);
  const { classes } = useStyles();

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const dialogContent = () => {
    return (
      <>
        <Typography>
          This is an example of how to use the Dialog component.
        </Typography>
        <Typography>
          This component is used whenever confirmation of some sort is needed,
          such as:
        </Typography>
        <ul>
          <li>
            <Typography>
              Consent to sensitive matters like GDPR, access, etc;
            </Typography>
          </li>
          <li>
            <Typography>
              Save, submit, cancel after a form is completed;
            </Typography>
          </li>
          <li>
            <Typography>Alert message;</Typography>
          </li>
          <li>
            <Typography>Buttons are optional.</Typography>
          </li>
        </ul>
        <Typography>
          The color for the secondary button is the same as the primary.
        </Typography>
        <pre>color="primary"</pre>
      </>
    );
  };

  return (
    <>
      <Button color="primary" variant="contained" onClick={openDialog}>
        Open Dialog
      </Button>
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title">
          Dialog Box Title
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={closeDialog}
            size="large"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>{dialogContent()}</DialogContent>
        <DialogActions>
          <Button color="primary" onClick={closeDialog}>
            Secondary action
          </Button>
          <Button color="primary" onClick={closeDialog}>
            Primary action
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
