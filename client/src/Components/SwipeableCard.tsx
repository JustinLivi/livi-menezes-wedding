import * as React from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getSwipe } from '../store/selectors/swipe';

export interface SwipeableCardStateProps {
  direction?: 'left' | 'right';
}

export interface SwipeableCardParentProps {
  swipe?: boolean;
  className?: string;
  swipeRight?: () => void;
  swipeLeft?: () => void;
}

export type SwipeableCardProps = SwipeableCardStateProps &
  SwipeableCardParentProps;

export interface SwipeableLocalState {
  mouseDown: boolean;
  mouseX: number;
  percentDragged: number;
}

export class UnconnectedSwipeableCard extends React.Component<
  SwipeableCardProps,
  SwipeableLocalState
> {
  constructor(props: SwipeableCardProps) {
    super(props);
    this.state = {
      mouseDown: false,
      mouseX: 0,
      percentDragged: 0.5
    };
  }

  public componentDidMount() {
    const { swipe } = this.props;
    if (!swipe) {
      return;
    }
    document.onmousemove = this.handleMouseMove;
    document.onmouseup = this.handleMouseUp;
    document.ontouchmove = this.handleTouchMove;
    document.ontouchend = this.handleTouchEnd;
  }

  public componentWillUnmount() {
    const { swipe } = this.props;
    if (!swipe) {
      return;
    }
    document.onmousemove = null;
    document.onmouseup = null;
    document.ontouchmove = null;
    document.ontouchend = null;
  }

  public handleMouseDown: (
    currentX: number
  ) => React.MouseEventHandler = currentX => event => {
    this.setState({
      mouseDown: true,
      mouseX: event.clientX,
      percentDragged: (currentX + 50) / 100
    });
  };

  public handleMouseMove: GlobalEventHandlers['onmousemove'] = event => {
    event.preventDefault();
    if (this.state.mouseDown) {
      this.setState(({ percentDragged, mouseX }) => ({
        mouseX: event.clientX,
        percentDragged: percentDragged + (event.clientX - mouseX) / innerWidth
      }));
    }
  };

  public handleMouseUp: GlobalEventHandlers['onmouseup'] = event => {
    event.preventDefault();
    const { swipeRight, swipeLeft } = this.props;
    const { percentDragged } = this.state;

    if (Math.abs(percentDragged - 0.5) > 0.1) {
      if (percentDragged - 0.5 > 0 && swipeRight) {
        swipeRight();
      }
      if (percentDragged - 0.5 < 0 && swipeLeft) {
        swipeLeft();
      }
    }
    this.setState({ mouseDown: false });
  };

  public handleTouchStart: (
    currentX: number
  ) => React.TouchEventHandler = currentX => event => {
    this.setState({
      mouseDown: true,
      mouseX: event.touches[0].clientX,
      percentDragged: (currentX + 50) / 100
    });
  };

  public handleTouchMove: GlobalEventHandlers['ontouchmove'] = event => {
    if (this.state.mouseDown) {
      event.preventDefault();
      this.setState(({ percentDragged, mouseX }) => ({
        mouseX: event.touches[0].clientX,
        percentDragged:
          percentDragged + (event.touches[0].clientX - mouseX) / innerWidth
      }));
    }
  };

  public handleTouchEnd: GlobalEventHandlers['ontouchend'] = event => {
    if (this.state.mouseDown) {
      const { swipeRight, swipeLeft } = this.props;
      const { percentDragged } = this.state;
      event.preventDefault();
      if (Math.abs(percentDragged - 0.5) > 0.1) {
        if (percentDragged - 0.5 > 0 && swipeRight) {
          swipeRight();
        }
        if (percentDragged - 0.5 < 0 && swipeLeft) {
          swipeLeft();
        }
      }
      this.setState({ mouseDown: false });
    }
  };

  public render() {
    const { children, direction, className, swipe } = this.props;
    const { percentDragged, mouseDown } = this.state;
    if (!swipe && !direction) {
      return (
        <div
          className={className}
          style={{
            position: 'absolute',
            width: 400
          }}
        >
          {children}
        </div>
      );
    }
    const config = { stiffness: 90, damping: 30 };
    let multiplier = 0;
    if (direction === 'left') {
      multiplier = -1;
    } else if (direction === 'right') {
      multiplier = 1;
    }
    const draggedX = 100 * percentDragged - 50;
    const rotX = 30 * percentDragged - 15;
    return (
      <Motion
        defaultStyle={{ x: draggedX, rot: rotX, bonus: 0 }}
        style={{
          bonus: mouseDown ? 0 : spring(multiplier * 400, config),
          rot: mouseDown ? rotX : spring(multiplier * 30, config),
          x: mouseDown ? draggedX : spring(multiplier * 70, config)
        }}
      >
        {({ x, rot, bonus }) => (
          <div
            onMouseDown={this.handleMouseDown(x)}
            onTouchStart={this.handleTouchStart(x)}
            className={className}
            style={{
              position: 'absolute',
              transform: `translate3d(calc(${x}vw + ${bonus}px), 0, 0) rotateZ(${rot}deg)`,
              width: 400
            }}
          >
            {children}
          </div>
        )}
      </Motion>
    );
  }
}

export const mapStateToProps = createSelector(
  [getSwipe],
  direction => ({
    direction
  })
);

export const SwipeableCard = connect(mapStateToProps)(UnconnectedSwipeableCard);
