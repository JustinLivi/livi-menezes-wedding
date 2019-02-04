import { createStyles, Grid, WithStyles, withStyles } from '@material-ui/core';
import { forEach, range } from 'lodash';
import * as React from 'react';
import { Motion, spring } from 'react-motion';

import { SwipeIcon } from '../../Components/SwipeIcon';
import { theme } from '../../theme';

const styles = createStyles({
  cantMakeIt: {
    marginRight: '3vw',
    textAlign: 'right',
    width: '40vw'
  },
  cover: {
    bottom: -100,
    color: theme.palette.primary.light,
    display: 'flex',
    left: -100,
    padding: 100,
    paddingTop: 0,
    position: 'absolute',
    right: -100,
    top: -100
  },
  imGoing: {
    marginLeft: '3vw',
    width: '40vw'
  },
  root: {
    bottom: 0,
    fontWeight: 'bold',
    height: '100vh',
    left: 0,
    overflow: 'visible',
    position: 'fixed',
    right: 0,
    top: 0,
    width: '100vw',
    zIndex: 2000
  },
  swipeIcon: {
    height: 'auto',
    marginBottom: 20,
    maxWidth: '14vw',
    textAlign: 'center',
    width: 400
  }
});

export interface SwipeInstructionsLocalState {
  fadeOut: boolean;
  visible: boolean;
  wobbleLeft: boolean;
}

export class UnstyledSwipeInstructions extends React.Component<
  WithStyles<typeof styles>,
  SwipeInstructionsLocalState
> {
  constructor(props: WithStyles<typeof styles>) {
    super(props);
    this.state = {
      fadeOut: false,
      visible: false,
      wobbleLeft: false
    };
  }

  public componentDidMount() {
    setTimeout(() => {
      this.setState({ fadeOut: true });
    }, 5000);
    setTimeout(() => {
      this.setState({ visible: false });
    }, 6000);
    setTimeout(() => {
      this.setState({ visible: true });
    }, 500);
    forEach(range(5), i => {
      setTimeout(() => {
        this.setState(({ wobbleLeft }) => ({ wobbleLeft: !wobbleLeft }));
      }, i * 1000);
    });
  }

  public render() {
    const {
      classes: { root, cover, swipeIcon, cantMakeIt, imGoing }
    } = this.props;
    const { fadeOut, visible, wobbleLeft } = this.state;
    if (!visible) {
      return <React.Fragment />;
    }
    return (
      <Motion
        defaultStyle={{ opacity: 0, rot: 0, globalOpacity: 1 }}
        style={{
          globalOpacity: fadeOut
            ? spring(0, { stiffness: 300, damping: 50 })
            : 1,
          opacity: spring(0.6, { stiffness: 100, damping: 17 }),
          rot: wobbleLeft
            ? spring(-45, { stiffness: 100, damping: 17 })
            : spring(45, { stiffness: 100, damping: 17 })
        }}
      >
        {({ opacity, globalOpacity, rot }) => (
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
              <Grid
                container
                direction='column'
                justify='center'
                alignItems='center'
              >
                <Grid
                  container
                  direction='row'
                  justify='center'
                  alignItems='center'
                >
                  <Grid item className={cantMakeIt}>
                    Can't Make It
                  </Grid>
                  <SwipeIcon
                    className={swipeIcon}
                    style={{
                      transform: `rotateZ(${rot}deg)`
                    }}
                  />
                  <Grid item className={imGoing}>
                    I'm Going!
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                >
                  Swipe to RSVP
                </Grid>
              </Grid>
            </div>
          </div>
        )}
      </Motion>
    );
  }
}

export const SwipeInstructions = withStyles(styles)(UnstyledSwipeInstructions);
