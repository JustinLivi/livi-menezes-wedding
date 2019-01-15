import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Directions } from '../Pages/Directions';
import { OurStory } from '../Pages/OurStory';
import { OurStoryDetails } from '../Pages/OurStory/Details';
import { Rsvp } from '../Pages/Rsvp';
import { CantMakeIt } from '../Pages/Rsvp/CantMakeIt';
import { RsvpDetails } from '../Pages/Rsvp/Details';
import { ThingsToDo } from '../Pages/ThingsToDo';
import { Venue } from '../Pages/Venue';
import { VenueDetails } from '../Pages/Venue/Details';
import { WhereToStay } from '../Pages/WhereToStay';

export const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    minHeight: '100vh'
  }
});

export interface ProtectedRoutesProps extends WithStyles<typeof styles> {}

export const UnstyledProtectedRoutes: React.SFC<ProtectedRoutesProps> = ({
  classes: { root }
}) => (
  <Switch>
    <Route path='/' exact component={Rsvp} />
    <Route path='/details' exact component={RsvpDetails} />
    <Route path='/cant-make-it' exact component={CantMakeIt} />
    <Route path='/our-story' exact component={OurStory} />
    <Route path='/our-story/details' component={OurStoryDetails} />
    <Route path='/venue' exact component={Venue} />
    <Route path='/venue/details' exact component={VenueDetails} />
    <Route path='/directions' exact component={Directions} />
    <Route path='/where-to-stay' exact component={WhereToStay} />
    <Route path='/things-to-do' exact component={ThingsToDo} />
  </Switch>
);

export const ProtectedRoutes = withStyles(styles)(UnstyledProtectedRoutes);