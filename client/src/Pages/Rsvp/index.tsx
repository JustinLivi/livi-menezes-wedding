import { Typography } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { DetailsIcons } from '../../ButtonBar/Details';
import { RsvpBar } from '../../ButtonBar/RsvpBar';
import { DetailsUpdates } from '../../common';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import justinMarisa from '../../profiles/justin-marisa.jpg';
import { changeDetails, updateDetails } from '../../store/actions/updateDetails';
import { getRelationshipId, getUserId, getWeddingRsvp } from '../../store/selectors';

export interface RsvpStateProps {
  userId?: string;
  relationId?: string;
  weddingRsvp?: boolean;
}

export interface RsvpDispatchProps {
  updateDetails: typeof updateDetails;
  changeDetails: typeof changeDetails;
}

export type RsvpProps = RsvpStateProps & RsvpDispatchProps;

export class UnconnectedRsvp extends React.Component<RsvpProps> {
  constructor(props: RsvpProps) {
    super(props);
  }

  public update = (value: DetailsUpdates) => {
    const { updateDetails: update, userId } = this.props;
    if (userId) {
      update({
        ...value,
        userId
      });
    }
  };

  public render() {
    const { weddingRsvp } = this.props;
    return (
      <ColumnLayout>
        <ProfileCard
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
        <RsvpBar
          detailsIconType={
            weddingRsvp === undefined ? undefined : DetailsIcons.nextArrow
          }
          hideHelp
          toDetails={weddingRsvp === undefined ? '/details' : '/rsvp/details'}
        />
      </ColumnLayout>
    );
  }
}

export const mapStateToProps = createSelector(
  [getWeddingRsvp, getUserId, getRelationshipId],
  (weddingRsvp, userId, relationId) => ({
    relationId,
    userId,
    weddingRsvp
  })
);

export const actionCreators = {
  changeDetails,
  updateDetails
};

export const Rsvp = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvp);
