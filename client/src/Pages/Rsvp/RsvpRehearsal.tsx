import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Breadcrumbs } from '../../Breadcrumbs';
import { RsvpRehearsalBar } from '../../ButtonBar/RsvpRehearsalBar';
import { ItsaMatch } from '../../Components/ItsaMatch';
import { REACT_APP_PICTURE_ENDPOINT } from '../../config';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import defaultProfile from '../../profiles/default_profile.jpg';
import justinMarisa from '../../profiles/justin-marisa.jpg';
import { rsvpRehearsal } from '../../store/actions/rsvpRehearsal';
import { getPhoto, getRedirect, getRehearsalRsvp, getUserId } from '../../store/selectors/user';
import { AvatarCard } from './AvatarCard';
import { RehearsalDetails } from './RehearsalDetails';

const styles = createStyles({
  centered: {
    textAlign: 'center'
  },
  topName: {
    marginBottom: 15
  }
});

export interface RsvpRehearsalStateProps {
  rehearsalRsvp?: boolean;
  photo?: string;
  redirect?: string;
  userId?: string;
}

export interface RsvpRehearsalDispatchProps {
  rsvpRehearsal: typeof rsvpRehearsal;
}

export interface RsvpRehearsalParentProps extends WithStyles<typeof styles> {}

export type RsvpRehearsaltProps = RsvpRehearsalParentProps &
  RsvpRehearsalStateProps &
  RsvpRehearsalDispatchProps;

export class UnconnectedRsvpRehearsal extends React.Component<
  RsvpRehearsaltProps
> {
  constructor(props: RsvpRehearsaltProps) {
    super(props);
  }

  public rsvp: (response: boolean) => () => void = response => () => {
    const { rsvpRehearsal: shouldRsvp, userId } = this.props;
    if (userId) {
      shouldRsvp({ body: { userId, rsvp: response }, params: {} });
    }
  };

  public render() {
    const {
      rehearsalRsvp,
      redirect,
      classes: { topName, centered },
      photo
    } = this.props;
    return (
      <ColumnLayout>
        {rehearsalRsvp === true && redirect ? (
          <ItsaMatch
            leftPhoto={
              photo ? `${REACT_APP_PICTURE_ENDPOINT}/${photo}` : defaultProfile
            }
            name={name}
            rightPhoto={justinMarisa}
            message="You're going to the rehearsal dinner!"
            description="Justin and Marisa's Rehearsal Dinner"
          />
        ) : (
          undefined
        )}
        <AvatarCard
          swipe
          swipeRight={this.rsvp(true)}
          swipeLeft={this.rsvp(false)}
        >
          <Typography
            className={classnames(topName, centered)}
            variant='h6'
            component='p'
          >
            RSVP For Rehearsal Dinner
          </Typography>
          <Typography variant='body1' className={centered} component='p'>
            You're invited to our rehearsal dinner!
          </Typography>
          <RehearsalDetails />
        </AvatarCard>
        <Breadcrumbs activeStep={2} />
        <RsvpRehearsalBar />
      </ColumnLayout>
    );
  }
}

export const mapStateToProps = createSelector(
  [getRehearsalRsvp, getPhoto, getRedirect, getUserId],
  (rehearsalRsvp, photo, redirect, userId) => ({
    photo,
    redirect,
    rehearsalRsvp,
    userId
  })
);

export const actionCreators = {
  rsvpRehearsal
};

export const UnstyledRsvpRehearsal = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvpRehearsal);

export const RsvpRehearsal = withStyles(styles)(UnstyledRsvpRehearsal);
