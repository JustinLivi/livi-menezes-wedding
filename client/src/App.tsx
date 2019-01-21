import { MuiThemeProvider } from '@material-ui/core';
import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { CacheRefresher } from './Components/CacheRefresher';
import { Redirector } from './Routing/Redirector';
import { Routes } from './Routing/Routes';
import { theme } from './theme';

export class App extends Component {
  public componentDidMount() {
    const $root = document.getElementById('root');
    if ($root) {
      $root.scrollTo(0, 100);
    }
  }

  public componentDidUpdate() {
    this.componentDidMount();
  }

  public render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: '100vh',
          maxHeight: '100vh',
          maxWidth: '100vw',
          minHeight: '100vh',
          minWidth: '100vw',
          width: '100vw'
        }}
      >
        <Router>
          <MuiThemeProvider theme={theme}>
            <Routes />
            <Redirector />
            <CacheRefresher />
          </MuiThemeProvider>
        </Router>
      </div>
    );
  }
}
