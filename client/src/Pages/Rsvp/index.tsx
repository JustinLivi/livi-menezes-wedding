import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Breadcrumbs } from '../../Breadcrumbs';
import { DetailsIcons } from '../../ButtonBar/Details';
import { RsvpBar } from '../../ButtonBar/RsvpBar';
import { ItsaMatch } from '../../Components/ItsaMatch';
import { ProfileCard } from '../../Components/ProfileCard';
import { REACT_APP_PICTURE_ENDPOINT } from '../../config';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import justinMarisa from '../../profiles/justin-marisa.jpg';
import { rsvpCeremony } from '../../store/actions/rsvpCeremony';
import { getName, getPhoto, getRedirect, getUserId, getWeddingRsvp } from '../../store/selectors/user';

export const styles = createStyles({
  standardCard: {
    height: 450,
    maxHeight: 'calc(100vh - 260px)',
    overflow: 'auto',
    position: 'relative'
  }
});

export interface RsvpStateProps {
  weddingRsvp?: boolean;
  userId?: string;
  name?: string;
  photo?: string;
  redirect?: string;
}

export interface RsvpDispatchProps {
  rsvpCeremony: typeof rsvpCeremony;
}

export interface RsvpParentProps extends WithStyles<typeof styles> {}

export type RsvpProps = RsvpParentProps & RsvpStateProps & RsvpDispatchProps;

export class UnconnectedRsvp extends React.Component<RsvpProps> {
  constructor(props: RsvpProps) {
    super(props);
  }

  public rsvp: (response: boolean) => () => void = response => () => {
    const { rsvpCeremony: shouldRsvp, userId } = this.props;
    if (userId) {
      shouldRsvp({ body: { userId, rsvp: response }, params: {} });
    }
  };

  public render() {
    const {
      photo,
      name,
      weddingRsvp,
      redirect,
      classes: { standardCard }
    } = this.props;
    return (
      <ColumnLayout>
        {weddingRsvp === true && redirect ? (
          <ItsaMatch
            leftPhoto={`${REACT_APP_PICTURE_ENDPOINT}/${photo}`}
            name={name}
            rightPhoto={justinMarisa}
            message="You're going to Justin and Marisa's Wedding!"
            description="Justin and Marisa's Wedding"
          />
        ) : (
          undefined
        )}
        <ProfileCard
          swipeRight={this.rsvp(true)}
          swipeLeft={this.rsvp(false)}
          className={standardCard}
          image={justinMarisa}
          title="Justin and Marisa's Wedding"
          blurb={
            <React.Fragment>
              <Typography component='p'>
                Sunday, October 13, 2019 at 4pm
              </Typography>
              <Typography component='p'>Baltimore, MD</Typography>
            </React.Fragment>
          }
        />
        <Breadcrumbs activeStep={0} />
        <RsvpBar
          detailsIconType={
            weddingRsvp === undefined ? undefined : DetailsIcons.nextArrow
          }
          toDetails={weddingRsvp === undefined ? '/details' : '/rsvp/details'}
        />
      </ColumnLayout>
    );
  }
}

export const mapStateToProps = createSelector(
  [getWeddingRsvp, getUserId, getPhoto, getName, getRedirect],
  (weddingRsvp, userId, photo, name, redirect) => ({
    name,
    photo,
    redirect,
    userId,
    weddingRsvp
  })
);

export const actionCreators = {
  rsvpCeremony
};

export const UnstyledRsvp = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvp);

export const Rsvp = withStyles(styles)(UnstyledRsvp);
