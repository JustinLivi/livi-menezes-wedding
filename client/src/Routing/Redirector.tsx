import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createSelector } from 'reselect';

import { redirected } from '../store/actions/redirect';
import { getSwipe } from '../store/selectors/swipe';
import { getRedirect } from '../store/selectors/user';

export interface RedirectorStateProps {
  to?: string;
  swipe?: string;
}

export interface RedirectorDispatchProps {
  redirected: typeof redirected;
}

export type RedirectorProps = RedirectorStateProps & RedirectorDispatchProps;

export interface RedirectorLocalState {
  timeout: NodeJS.Timeout | null;
  redirect?: string;
}

export class UnconnectedRedirector extends React.Component<
  RedirectorProps,
  RedirectorLocalState
> {
  constructor(props: RedirectorProps) {
    super(props);
    this.state = {
      timeout: null
    };
  }

  public componentDidMount() {
    const { to, redirected: handleRedirected, swipe } = this.props;
    const { timeout, redirect } = this.state;
    if (to && !timeout && !redirect) {
      this.setState({
        timeout: setTimeout(
          () => {
            const $body = document.getElementsByTagName('body');
            try {
              $body[0].setAttribute('style', '');
            } catch (error) {
              // do nothing
            }
            handleRedirected(undefined);
            this.setState({ timeout: null, redirect: to });
            scrollTo(0, 100);
          },
          swipe === 'left' ? 500 : 6000
        )
      });
    }
  }

  public componentDidUpdate() {
    this.componentDidMount();
    const { redirect } = this.state;
    if (redirect) {
      this.setState({
        redirect: undefined
      });
    }
  }

  public render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to={redirect} push />;
    }
    return <React.Fragment />;
  }
}

export const mapStateToProps = createSelector(
  [getRedirect, getSwipe],
  (to, swipe) => ({
    swipe,
    to
  })
);

export const actionCreators = {
  redirected
};

export const Redirector = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRedirector);
