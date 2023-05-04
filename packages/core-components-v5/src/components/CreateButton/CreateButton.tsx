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

import { BackstageTheme } from '@backstage/theme';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

/**
 * Properties for {@link CreateButton}
 *
 * @public
 */
export type CreateButtonProps = {
  title: string;
} & Partial<Pick<LinkProps, 'to'>>;

/**
 * Responsive Button giving consistent UX for creation of different things
 *
 * @public
 */
export function CreateButton(props: CreateButtonProps) {
  const { title, to } = props;
  const isXSScreen = useMediaQuery(theme => theme.breakpoints.down('sm'));

  if (!to) {
    return null;
  }

  return isXSScreen ? (
    <IconButton
      component={RouterLink}
      color="primary"
      title={title}
      size="small"
      to={to}
    >
      <AddCircleOutline />
    </IconButton>
  ) : (
    <Button component={RouterLink} variant="contained" color="primary" to={to}>
      {title}
    </Button>
  );
}
