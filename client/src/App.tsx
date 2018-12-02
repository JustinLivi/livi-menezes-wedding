import { MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { ButtonBar } from './ButtonBar';
import { NavBar } from './NavBar';
import { ProfileCard } from './ProfileCard';
import justinMarisa from './profiles/justin-marisa.jpg';
import { theme } from './theme';

export class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <NavBar />
          <ProfileCard image={justinMarisa} />
          <ButtonBar />
        </MuiThemeProvider>
      </Router>
    );
  }
}
