import { Typography } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { DetailsIcons } from '../../ButtonBar/Details';
import { RsvpBar } from '../../ButtonBar/RsvpBar';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import justinMarisa from '../../profiles/justin-marisa.jpg';
import { changeDetailsRelation, updateDetails } from '../../store/actions/updateDetails';
import { getWeddingRsvp } from '../../store/selectors/user';

export interface RsvpStateProps {
  weddingRsvp?: boolean;
}

export class UnconnectedRsvp extends React.Component<RsvpStateProps> {
  constructor(props: RsvpStateProps) {
    super(props);
  }

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
  [getWeddingRsvp],
  weddingRsvp => ({
    weddingRsvp
  })
);

export const actionCreators = {
  changeDetails: changeDetailsRelation,
  updateDetails
};

export const Rsvp = connect(
  mapStateToProps,
  actionCreators
)(UnconnectedRsvp);
