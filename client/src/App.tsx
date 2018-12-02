import { MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NavBar } from './NavBar';
import { Directions } from './Pages/Directions';
import { OurStory } from './Pages/OurStory';
import { Rsvp } from './Pages/Rsvp';
import { ThingsToDo } from './Pages/ThingsToDo';
import { Venue } from './Pages/Venue';
import { WhereToStay } from './Pages/WhereToStay';
import { theme } from './theme';

export class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <NavBar />
          <Switch>
            <Route path='/' exact={true} component={Rsvp} />
            <Route path='/our-story' component={OurStory} />
            <Route path='/venue' component={Venue} />
            <Route path='/directions' component={Directions} />
            <Route path='/where-to-stay' component={WhereToStay} />
            <Route path='/things-to-do' component={ThingsToDo} />
          </Switch>
        </MuiThemeProvider>
      </Router>
    );
  }
}
