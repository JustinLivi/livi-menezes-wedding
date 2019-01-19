import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Details } from '../Pages/Details';
import { Directions } from '../Pages/Directions';
import { OurStory } from '../Pages/OurStory';
import { OurStoryDetails } from '../Pages/OurStory/Details';
import { Rsvp } from '../Pages/Rsvp';
import { RsvpDetails } from '../Pages/Rsvp/RsvpDetails';
import { RsvpDetailsRelation } from '../Pages/Rsvp/RsvpDetailsRelation';
import { RsvpRelation } from '../Pages/Rsvp/RsvpRelation';
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
    <Route path='/rsvp/u/:relationId' exact component={RsvpRelation} />
    <Route path='/rsvp/details' exact component={RsvpDetails} />
    <Route
      path='/rsvp/details/:relationId'
      exact
      component={RsvpDetailsRelation}
    />
    <Route path='/details' exact component={Details} />
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
