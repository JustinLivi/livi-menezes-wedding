import { MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { MainContent } from './MainContent';
import { SideBar } from './SideBar';
import { theme } from './theme';

export class App extends Component {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={theme}>
          <SideBar />
          <MainContent />
        </MuiThemeProvider>
      </Router>
    );
  }
}
