import { Button, createStyles, Grid, Typography, WithStyles, withStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { Fullscreen as FullscreenIcon } from '@material-ui/icons';
import MobileDetect from 'mobile-detect';
import * as React from 'react';
import Fullscreen from 'react-fullscreen-crossbrowser';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Profile } from '../common';
import { NavBar } from '../NavBar';
import { LoginPage } from '../Pages/Login';
import { SideBar } from '../SideBar';
import { getProfile } from '../store/selectors/user';
import { theme } from '../theme';
import { ProtectedRoutes } from './ProtectedRoutes';

const md = new MobileDetect(window.navigator.userAgent);

export const styles = createStyles({
  fab: {
    color: 'white'
  },
  fullscreenHelp: {
    margin: 20,
    marginLeft: 40,
    marginRight: 40
  },
  fullscreenIcon: {
    marginRight: theme.spacing.unit
  },
  gridRoot: {
    flexGrow: 1,
    textAlign: 'center'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100vh',
    minHeight: 400
  }
});

export interface ProtectedRouterStateProps {
  profile?: Profile;
}

export interface ProtectedRouterParentProps extends WithStyles<typeof styles> {}

export type ProtectedRouterProps = ProtectedRouterStateProps &
  ProtectedRouterParentProps;

export interface ProtectedRouterLocalState {
  isFullscreen?: boolean;
  fullScreenRef?: Fullscreen | null;
}

export class UnstyledProtectedRouter extends React.Component<
  ProtectedRouterProps,
  ProtectedRouterLocalState
> {
  constructor(props: ProtectedRouterProps) {
    super(props);
    this.state = {};
  }

  public handleFullscreen = (isFullscreen: boolean) => {
    this.setState({ isFullscreen });
  };

  public decide = (isFullscreen: boolean) => () => {
    this.setState({ isFullscreen });
  };

  public getFullscreenRef = (fullScreenRef: Fullscreen | null) => {
    this.setState({ fullScreenRef });
  };

  public render() {
    const {
      classes: { root, gridRoot, fullscreenIcon, fullscreenHelp, fab },
      profile
    } = this.props;
    const { isFullscreen, fullScreenRef } = this.state;
    return (
      <Fullscreen
        ref={this.getFullscreenRef}
        enabled={this.state.isFullscreen}
        onChange={this.handleFullscreen}
      >
        {md.isPhoneSized() && !md.is('iPhone') && isFullscreen === undefined ? (
          <Grid
            className={gridRoot}
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Grid item>
              <Typography className={fullscreenHelp} variant='h5'>
                This experience is best in fullscreen
              </Typography>
            </Grid>
            <Grid item>
              <Fab
                className={fab}
                variant='extended'
                aria-label='Fullscreen'
                color='primary'
                onClick={this.decide(true)}
              >
                <FullscreenIcon className={fullscreenIcon} />
                Fullscreen
              </Fab>
            </Grid>
            <Grid item>
              <Button
                className={fullscreenHelp}
                variant='outlined'
                size='medium'
                aria-label='No thanks'
                onClick={this.decide(false)}
              >
                No thanks
              </Button>
            </Grid>
          </Grid>
        ) : profile || true ? (
          <React.Fragment>
            <SideBar />
            <div className={root}>
              <NavBar fullScreenRef={fullScreenRef} />
              <ProtectedRoutes />
            </div>
          </React.Fragment>
        ) : (
          <LoginPage error />
        )}
      </Fullscreen>
    );
  }
}

export const UnconnectedProtectedRouter = withStyles(styles)(
  UnstyledProtectedRouter
);

export const mapStateToProps = createSelector(
  [getProfile],
  profile => ({
    profile
  })
);

export const ProtectedRouter = connect(mapStateToProps)(
  UnconnectedProtectedRouter
);
