import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createSelector } from 'reselect';

import { redirected } from '../store/actions/redirect';
import { getRedirect } from '../store/selectors/user';

export interface RedirectorStateProps {
  to?: string;
}

export interface RedirectorDispatchProps {
  redirected: typeof redirected;
}

export type RedirectorProps = RedirectorStateProps & RedirectorDispatchProps;

export class UnconnectedRedirector extends React.Component<RedirectorProps> {
  constructor(props: RedirectorProps) {
    super(props);
  }

  public componentDidMount() {
    const { to, redirected: handleRedirected } = this.props;
    if (to) {
      handleRedirected(undefined);
    }
  }

  public componentDidUpdate() {
    this.componentDidMount();
  }

  public render() {
    const { to } = this.props;
    if (to) {
      return <Redirect to={to} push />;
    }
    return <React.Fragment />;
  }
}

export const mapStateToProps = createSelector(
  [getRedirect],
  to => ({
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
