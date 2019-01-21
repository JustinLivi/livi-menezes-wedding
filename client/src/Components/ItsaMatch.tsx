import { Avatar, createStyles, Grid, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Motion, spring } from 'react-motion';

import { ColumnLayout } from '../Layouts/ColumnLayout';
import { theme } from '../theme';
import { ItsaMatchIcon } from './ItsaMatchIcon';

const styles = createStyles({
  avatar: {
    height: 120,
    margin: 10,
    width: 120
  },
  cover: {
    bottom: -100,
    color: theme.palette.primary.light,
    display: 'flex',
    fontSize: '25em',
    left: -100,
    padding: 100,
    paddingTop: 0,
    position: 'absolute',
    right: -100,
    top: -100
  },
  itsaMatch: {
    height: 'auto',
    marginBottom: 20,
    maxWidth: '80vw',
    textAlign: 'center',
    width: 400
  },
  root: {
    bottom: 0,
    fontSize: '25em',
    height: '100vh',
    left: 0,
    overflow: 'visible',
    position: 'fixed',
    right: 0,
    top: 0,
    width: '100vw',
    zIndex: 2000
  },
  successMessage: {
    color: theme.palette.primary.light,
    marginTop: 20,
    maxWidth: '80vw',
    textAlign: 'center'
  }
});

export interface ItsaMatchProps extends WithStyles<typeof styles> {
  leftPhoto?: string;
  name?: string;
  rightPhoto: string;
  description: string;
  message: string;
}

export interface ItsaMatchLocalState {
  fadeOut: boolean;
  start: boolean;
}

export class UnstyledItsaMatch extends React.Component<
  ItsaMatchProps,
  ItsaMatchLocalState
> {
  constructor(props: ItsaMatchProps) {
    super(props);
    this.state = {
      fadeOut: false,
      start: false
    };
  }

  public componentDidMount() {
    setTimeout(() => {
      this.setState({ fadeOut: true });
    }, 5000);
    setTimeout(() => {
      this.setState({ start: true });
      const $body = document.getElementsByTagName('body');
      $body[0].setAttribute('style', 'position: absolute');
    }, 500);
  }

  public render() {
    const {
      leftPhoto,
      description,
      rightPhoto,
      message,
      classes: { root, avatar, itsaMatch, successMessage, cover }
    } = this.props;
    const { fadeOut, start } = this.state;
    if (!start) {
      return <React.Fragment />;
    }
    return (
      <Motion
        defaultStyle={{ opacity: 0, left: -80, right: 80, globalOpacity: 1 }}
        style={{
          globalOpacity: fadeOut
            ? spring(0, { stiffness: 300, damping: 50 })
            : 1,
          left: spring(0, { stiffness: 60, damping: 11 }),
          opacity: spring(0.95, { stiffness: 100, damping: 17 }),
          right: spring(0, { stiffness: 60, damping: 11 })
        }}
      >
        {({ opacity, left, right, globalOpacity }) => (
          <div
            className={root}
            style={{
              opacity: globalOpacity
            }}
          >
            <div
              className={cover}
              style={{
                backgroundColor: 'black',
                opacity
              }}
            />
            <div className={cover}>
              <ColumnLayout>
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                >
                  <ItsaMatchIcon className={itsaMatch} opacity={opacity} />
                </Grid>
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                >
                  <div
                    style={{
                      transform: `translate3d(${right}vw, 0, 0)`
                    }}
                  >
                    <Avatar
                      className={avatar}
                      alt={name || 'You'}
                      src={leftPhoto}
                    >
                      {name}
                    </Avatar>
                  </div>
                  <div
                    style={{
                      transform: `translate3d(${left}vw, 0, 0)`
                    }}
                  >
                    <Avatar
                      className={avatar}
                      alt={description}
                      src={rightPhoto}
                    >
                      {description}
                    </Avatar>
                  </div>
                </Grid>
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                >
                  <div
                    style={{
                      opacity
                    }}
                  >
                    <Typography
                      className={successMessage}
                      variant='h6'
                      component='h2'
                    >
                      {message}
                    </Typography>
                  </div>
                </Grid>
              </ColumnLayout>
            </div>
          </div>
        )}
      </Motion>
    );
  }
}

export const ItsaMatch = withStyles(styles)(UnstyledItsaMatch);
