import { createStyles, Icon, WithStyles, withStyles } from '@material-ui/core';
import Fab, { FabProps } from '@material-ui/core/Fab';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { theme } from '../theme';
import { Omit } from '../Util/util';
import { buttonHolderStyles, commonButtonStyles } from './commonStyles';
import { DetailsIcon } from './DetailsIcon';

const styles = createStyles({
  fab: {
    ...commonButtonStyles,
    '&:hover': {
      backgroundColor: theme.details.color,
      color: theme.palette.primary.light
    },
    borderWidth: 13,
    color: theme.details.color,
    height: 80,
    width: 80
  },
  label: {
    textAlign: 'center'
  },
  root: buttonHolderStyles
});

export enum DetailsIcons {
  backArrow = 'backArrow',
  nextArrow = 'nextArrow',
  details = 'details'
}

export interface DetailsProps extends WithStyles<typeof styles> {
  iconType?: DetailsIcons;
  hideHelp?: true;
  to: string;
  external?: boolean;
}

export class UnstyledDetails extends React.Component<DetailsProps> {
  constructor(props: DetailsProps) {
    super(props);
  }

  public render() {
    const {
      hideHelp,
      external,
      to,
      classes: { fab, root, label },
      iconType
    } = this.props;
    return (
      <div className={root}>
        <Fab
          component={!external ? this.linkComponent : undefined}
          href={external ? to : undefined}
          target={external ? '_blank' : undefined}
          aria-label='Details'
          classes={{ root: fab }}
        >
          <Icon color='inherit'>
            <DetailsIcon iconType={iconType} />
          </Icon>
        </Fab>
        {!hideHelp && <span className={label}>details</span>}
      </div>
    );
  }

  private linkComponent = (props: Omit<FabProps, 'innerRef'>) => (
    <Link to={this.props.to} {...props} />
  );
}

export const Details = withStyles(styles)(UnstyledDetails);
