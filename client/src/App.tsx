import { MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { CacheRefresher } from './Components/CacheRefresher';
import { Redirector } from './Routing/Redirector';
import { Routes } from './Routing/Routes';
import { theme } from './theme';

export class App extends Component {
  public render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <Routes />
          <Redirector />
          <CacheRefresher />
        </MuiThemeProvider>
      </Router>
    );
  }
}
