import { createStyles, Icon, WithStyles, withStyles } from '@material-ui/core';
import Fab, { FabProps } from '@material-ui/core/Fab';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { DisabledTooltip } from '../Components/DisabledTooltip';
import { theme } from '../theme';
import { Omit } from '../Util/util';
import { ChevronIcon, ChevronIcons } from './ChevronIcon';
import { buttonHolderStyles, commonButtonStyles } from './commonStyles';

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

export interface ChevronProps extends WithStyles<typeof styles> {
  to: string;
  iconType?: ChevronIcons;
  help?: string;
  external?: boolean;
  disabled?: string;
}

export class UnstyledChevron extends React.Component<ChevronProps> {
  constructor(props: ChevronProps) {
    super(props);
  }

  public render() {
    const {
      help,
      external,
      to,
      classes: { fab, root, label },
      iconType,
      disabled
    } = this.props;
    return (
      <DisabledTooltip help={disabled} disabled={!!disabled} placement='top'>
        <div className={root}>
          <Fab
            disabled={!!disabled}
            component={!external ? this.linkComponent : undefined}
            href={external ? to : undefined}
            target={external ? '_blank' : undefined}
            aria-label='Details'
            classes={{ root: fab }}
          >
            <Icon color='inherit'>
              <ChevronIcon iconType={iconType} />
            </Icon>
          </Fab>
          {help && <span className={label}>{help}</span>}
        </div>
      </DisabledTooltip>
    );
  }

  private linkComponent = (props: Omit<FabProps, 'innerRef'>) => (
    <Link to={this.props.to} {...props} />
  );
}

export const Chevron = withStyles(styles)(UnstyledChevron);
