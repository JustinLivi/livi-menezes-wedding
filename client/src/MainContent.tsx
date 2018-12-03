import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { NavBar } from './NavBar';
import { Directions } from './Pages/Directions';
import { OurStory } from './Pages/OurStory';
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

export interface MainContentProps extends WithStyles<typeof styles> {}

export const UnstyledMainContent: React.SFC<MainContentProps> = ({
  classes: { root }
}) => (
  <div className={root}>
    <NavBar />
    <Switch>
      <Route path='/' exact={true} component={Rsvp} />
      <Route path='/our-story' component={OurStory} />
      <Route path='/venue' component={Venue} />
      <Route path='/directions' component={Directions} />
      <Route path='/where-to-stay' component={WhereToStay} />
      <Route path='/things-to-do' component={ThingsToDo} />
    </Switch>
  </div>
);

export const MainContent = withStyles(styles)(UnstyledMainContent);
