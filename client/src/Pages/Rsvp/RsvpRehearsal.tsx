import { createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Breadcrumbs } from '../../Breadcrumbs';
import { RsvpRehearsalBar } from '../../ButtonBar/RsvpRehearsalBar';
import { buttonBarStyles } from '../../ButtonBar/RsvpRelationBar';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { getPhoto, getRehearsalRsvp } from '../../store/selectors/user';
import { AvatarCard } from './AvatarCard';

const styles = createStyles({
  ...buttonBarStyles,
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    padding: 5,
    width: '100%'
  },
  centered: {
    textAlign: 'center'
  },
  content: {
    paddingTop: 25
  },
  standardCard: {
    overflow: 'initial',
    position: 'relative'
  },
  topName: {
    marginBottom: 15
  }
});

export interface RsvpRehearsalStateProps {
  rehearsalRsvp?: boolean;
  photo?: string;
}

export interface RsvpRehearsalParentProps extends WithStyles<typeof styles> {}

export type RsvpRehearsaltProps = RsvpRehearsalParentProps &
  RsvpRehearsalStateProps;

export class UnconnectedRsvpRehearsal extends React.Component<
  RsvpRehearsaltProps
> {
  constructor(props: RsvpRehearsaltProps) {
    super(props);
  }

  public render() {
    const {
      rehearsalRsvp,
      classes: { standardCard, content, avatar, topName, centered },
      photo
    } = this.props;
    return (
      <ColumnLayout>
        <AvatarCard>
          <Typography
            className={classnames(topName, centered)}
            variant='h6'
            component='p'
          >
            RSVP For Rehearsal
          </Typography>
          <Typography className={topName} component='p'>
            You're invited to our rehearsal dinner!
          </Typography>
          <Typography className={topName} component='p'>
            Details TBD
          </Typography>
        </AvatarCard>
        <Breadcrumbs activeStep={2} />
        <RsvpRehearsalBar />
      </ColumnLayout>
    );
  }
}

export const mapStateToProps = createSelector(
  [getRehearsalRsvp, getPhoto],
  (rehearsalRsvp, photo) => ({
    photo,
    rehearsalRsvp
  })
);

export const UnstyledRsvpRehearsal = connect(mapStateToProps)(
  UnconnectedRsvpRehearsal
);

export const RsvpRehearsal = withStyles(styles)(UnstyledRsvpRehearsal);
