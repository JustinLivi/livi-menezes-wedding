import './App.css';

import { MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';

import { HitchdAppBar } from './HitchdAppBar';
import { ProfileCard } from './ProfileCard';
import justinMarisa from './profiles/justin-marisa.jpg';
import { theme } from './theme';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <HitchdAppBar />
        <ProfileCard image={justinMarisa} />
      </MuiThemeProvider>
    );
  }
}

export default App;
