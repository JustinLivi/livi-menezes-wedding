import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Breadcrumbs } from '../../Breadcrumbs';
import { DetailsIcons } from '../../ButtonBar/Details';
import { RsvpBar } from '../../ButtonBar/RsvpBar';
import { ProfileCard } from '../../Components/ProfileCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import justinMarisa from '../../profiles/justin-marisa.jpg';
import { getWeddingRsvp } from '../../store/selectors/user';

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
}

export interface RsvpParentProps extends WithStyles<typeof styles> {}

export type RsvpProps = RsvpParentProps & RsvpStateProps;

export class UnconnectedRsvp extends React.Component<RsvpProps> {
  constructor(props: RsvpProps) {
    super(props);
  }

  public render() {
    const {
      weddingRsvp,
      classes: { standardCard }
    } = this.props;
    return (
      <ColumnLayout>
        <ProfileCard
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
  [getWeddingRsvp],
  weddingRsvp => ({
    weddingRsvp
  })
);

export const UnstyledRsvp = connect(mapStateToProps)(UnconnectedRsvp);

export const Rsvp = withStyles(styles)(UnstyledRsvp);
