import './App.css';

import { MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';

import { HitchdAppBar } from './HitchdAppBar';
import { theme } from './theme';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <HitchdAppBar />
      </MuiThemeProvider>
    );
  }
}

export default App;
