import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Details } from '../Pages/Details';
import { Directions } from '../Pages/Directions';
import { OurStory } from '../Pages/OurStory';
import { OurStoryAnswer } from '../Pages/OurStory/Answer';
import { OurStoryDetails } from '../Pages/OurStory/Details';
import { Rsvp } from '../Pages/Rsvp';
import { RsvpComplete } from '../Pages/Rsvp/RsvpComplete';
import { RsvpDetails } from '../Pages/Rsvp/RsvpDetails';
import { RsvpDetailsRelation } from '../Pages/Rsvp/RsvpDetailsRelation';
import { RsvpRehearsal } from '../Pages/Rsvp/RsvpRehearsal';
import { RsvpRehearsalRelation } from '../Pages/Rsvp/RsvpRehearsalRelation';
import { RsvpRelation } from '../Pages/Rsvp/RsvpRelation';
import { RsvpReview } from '../Pages/Rsvp/RsvpReview';
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

export const RedirectToRoot = () => <Redirect to='/' />;

export interface ProtectedRoutesProps extends WithStyles<typeof styles> {}

export const UnstyledProtectedRoutes: React.SFC<ProtectedRoutesProps> = ({
  classes: { root }
}) => (
  <Switch>
    <Route path='/' exact component={Details} />
    <Route path='/rsvp' exact component={Rsvp} />
    <Route path='/rsvp/u/:relationId' exact component={RsvpRelation} />
    <Route path='/rsvp/rehearsal/' exact component={RsvpRehearsal} />
    <Route
      path='/rsvp/rehearsal/:relationId'
      exact
      component={RsvpRehearsalRelation}
    />
    <Route path='/rsvp/details' exact component={RsvpDetails} />
    <Route
      path='/rsvp/details/:relationId'
      exact
      component={RsvpDetailsRelation}
    />
    <Route path='/rsvp/review' exact component={RsvpReview} />
    <Route path='/rsvp/complete' exact component={RsvpComplete} />
    <Route path='/our-story' exact component={OurStory} />
    <Route path='/our-story/question/:questionId' component={OurStoryDetails} />
    <Route path='/our-story/answer/:questionId' component={OurStoryAnswer} />
    <Route path='/venue' exact component={Venue} />
    <Route path='/venue/details' exact component={VenueDetails} />
    <Route path='/directions' exact component={Directions} />
    <Route path='/where-to-stay' exact component={WhereToStay} />
    <Route path='/things-to-do' exact component={ThingsToDo} />
    <Route path='/*' component={RedirectToRoot} />
  </Switch>
);

export const ProtectedRoutes = withStyles(styles)(UnstyledProtectedRoutes);
