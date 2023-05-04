/*
 * Copyright 2020 The Backstage Authors
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
import React, { ComponentType } from 'react';
import { LinkButton } from './LinkButton';
import { useLocation } from 'react-router-dom';
import { createRouteRef, useRouteRef } from '@backstage/core-plugin-api';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import MaterialButton from '@mui/material/Button';
import { wrapInTestApp } from '@backstage/test-utils';
import { Link } from '../Link';

const routeRef = createRouteRef({
  id: 'storybook.test-route',
});

const Location = () => {
  const location = useLocation();
  return <pre>Current location: {location.pathname}</pre>;
};

export default {
  title: 'Inputs/Button',
  component: LinkButton,
  decorators: [
    (Story: ComponentType<{}>) =>
      wrapInTestApp(
        <>
          <Typography>
            A collection of buttons that should be used in the Backstage
            interface. These leverage the properties inherited from{' '}
            <Link to="https://material-ui.com/components/buttons/">
              Material-UI Button
            </Link>
            , but include an opinionated set that align to the Backstage design.
          </Typography>

          <Divider />

          <div>
            <div>
              <Location />
            </div>
            <Story />
          </div>
        </>,
        { mountedRoutes: { '/hello': routeRef } },
      ),
  ],
};

export const Default = () => {
  const link = useRouteRef(routeRef);
  // Design Permutations:
  // color   = default | primary | secondary
  // variant = contained | outlined | text
  return (
    <List>
      <ListItem>
        <ListItemText>
          <Typography variant="h6">Default Button:</Typography>
          This is the default button design which should be used in most cases.
          <br />
          <pre>color="primary" variant="contained"</pre>
        </ListItemText>

        <LinkButton to={link()} color="primary" variant="contained">
          Register Component
        </LinkButton>
      </ListItem>
      <ListItem>
        <ListItemText>
          <Typography variant="h6">Secondary Button:</Typography>
          Used for actions that cancel, skip, and in general perform negative
          functions, etc.
          <br />
          <pre>color="secondary" variant="contained"</pre>
        </ListItemText>

        <LinkButton to={link()} color="secondary" variant="contained">
          Cancel
        </LinkButton>
      </ListItem>
      <ListItem>
        <ListItemText>
          <Typography variant="h6">Tertiary Button:</Typography>
          Used commonly in a ButtonGroup and when the button function itself is
          not a primary function on a page.
          <br />
          <pre>variant="outlined"</pre>
        </ListItemText>

        <LinkButton to={link()} variant="outlined">
          View Details
        </LinkButton>
      </ListItem>
    </List>
  );
};

export const ButtonLinks = () => {
  const link = useRouteRef(routeRef);

  const handleClick = () => {
    return 'Your click worked!';
  };

  return (
    <>
      <List>
        {
          // TODO: Refactor to use new routing mechanisms
        }
        <ListItem>
          <LinkButton to={link()} variant="outlined">
            Route Ref
          </LinkButton>
          &nbsp; has props for both Material-UI's component as well as for
          react-router-dom's Route object.
        </ListItem>

        <ListItem>
          <LinkButton to="/staticpath" variant="outlined">
            Static Path
          </LinkButton>
          &nbsp; links to a statically defined route. In general, this should be
          avoided.
        </ListItem>

        <ListItem>
          <MaterialButton href="https://backstage.io" variant="outlined">
            View URL
          </MaterialButton>
          &nbsp; links to a defined URL using Material-UI's Button.
        </ListItem>

        <ListItem>
          <MaterialButton onClick={handleClick} variant="outlined">
            Trigger Event
          </MaterialButton>
          &nbsp; triggers an onClick event using Material-UI's Button.
        </ListItem>
      </List>
    </>
  );
};
