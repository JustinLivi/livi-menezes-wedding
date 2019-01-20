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
    color: theme.palette.secondary.main,
    fontSize: '0.9em',
    marginTop: 5,
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
  to: string;
  iconType?: DetailsIcons;
  help?: string;
  external?: boolean;
}

export class UnstyledDetails extends React.Component<DetailsProps> {
  constructor(props: DetailsProps) {
    super(props);
  }

  public render() {
    const {
      help,
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
        {help && <span className={label}>{help}</span>}
      </div>
    );
  }

  private linkComponent = (props: Omit<FabProps, 'innerRef'>) => (
    <Link to={this.props.to} {...props} />
  );
}

export const Details = withStyles(styles)(UnstyledDetails);
