import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { NavBar } from './NavBar';
import { Directions } from './Pages/Directions';
import { OurStory } from './Pages/OurStory';
import { OurStoryDetails } from './Pages/OurStory/Details';
import { Rsvp } from './Pages/Rsvp';
import { ThingsToDo } from './Pages/ThingsToDo';
import { Venue } from './Pages/Venue';
import { WhereToStay } from './Pages/WhereToStay';

export const styles = createStyles({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }
});

export interface RoutesProps extends WithStyles<typeof styles> {}

export const UnstyledRoutes: React.SFC<RoutesProps> = ({
  classes: { root }
}) => (
  <div className={root}>
    <NavBar />
    <Switch>
      <Route path='/' exact component={Rsvp} />
      <Route path='/our-story' exact component={OurStory} />
      <Route path='/our-story/details' component={OurStoryDetails} />
      <Route path='/venue' exact component={Venue} />
      <Route path='/directions' exact component={Directions} />
      <Route path='/where-to-stay' exact component={WhereToStay} />
      <Route path='/things-to-do' exact component={ThingsToDo} />
    </Switch>
  </div>
);

export const Routes = withStyles(styles)(UnstyledRoutes);
