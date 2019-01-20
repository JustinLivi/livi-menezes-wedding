import { createStyles, Grid, MobileStepper, WithStyles, withStyles } from '@material-ui/core';
import { forEach, range } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getRelationshipInvitedRehearsal } from '../store/selectors/relationships';
import { getInvitedRehearsal, getRelationshipsCount } from '../store/selectors/user';
import { State } from '../store/stateDefinition';
import { theme } from '../theme';

const styles = createStyles({
  bar: {
    backgroundColor: theme.palette.primary.contrastText
  },
  progress: {
    backgroundColor: '#f9d7db',
    width: '100%'
  },
  root: {
    background: theme.palette.primary.light,
    flexGrow: 1,
    maxWidth: 400
  }
});

export interface BreadcrumbsStateProps {
  maxSteps: number;
}

export interface BreadcrumbsParentProps extends WithStyles<typeof styles> {
  activeStep: number;
}

export type BreadcrumbsProps = BreadcrumbsStateProps & BreadcrumbsParentProps;

export const UnconnectedBreadcrumbs: React.SFC<BreadcrumbsProps> = ({
  maxSteps,
  activeStep,
  classes: { progress, root, bar }
}) => (
  <Grid container direction='row' justify='center' alignItems='center'>
    <MobileStepper
      LinearProgressProps={{
        classes: { bar }
      }}
      classes={{ progress, root }}
      variant='progress'
      steps={maxSteps}
      position='static'
      activeStep={activeStep === -1 ? maxSteps : activeStep}
      nextButton={<React.Fragment />}
      backButton={<React.Fragment />}
    />
  </Grid>
);

export const mapStateToProps = (state: State) =>
  createSelector(
    [getRelationshipsCount, getInvitedRehearsal],
    (relationshipsCount, invitedRehearsal) => {
      let maxSteps = 3 + relationshipsCount * 2;
      forEach(range(relationshipsCount), index => {
        const relationInvitedRehearsal = getRelationshipInvitedRehearsal(
          state,
          {
            match: {
              isExact: true,
              params: {
                relationId: `${index}`
              },
              path: '',
              url: ''
            }
          }
        );
        if (relationInvitedRehearsal) {
          maxSteps += 1;
        }
      });
      if (invitedRehearsal) {
        maxSteps += 1;
      }
      return {
        maxSteps
      };
    }
  )(state);

export const UnstyledBreadcrumbs = connect(mapStateToProps)(
  UnconnectedBreadcrumbs
);

export const Breadcrumbs = withStyles(styles)(UnstyledBreadcrumbs);
