import { MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';

import { ButtonBar } from './ButtonBar';
import { HitchdAppBar } from './HitchdAppBar';
import { ProfileCard } from './ProfileCard';
import justinMarisa from './profiles/justin-marisa.jpg';
import { theme } from './theme';

export class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <HitchdAppBar />
        <ProfileCard image={justinMarisa} />
        <ButtonBar />
      </MuiThemeProvider>
    );
  }
}
