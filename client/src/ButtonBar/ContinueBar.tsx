import { createStyles, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { theme } from '../theme';
import { Details } from './Details';
import { DetailsIcons } from './DetailsIcon';

const styles = createStyles({
  buttonBar: {
    flexGrow: 0
  },
  root: {
    alignItems: 'center',
    boxPack: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 0,
    justifyContent: 'center',
    margin: theme.spacing.unit
  }
});

export interface ContinueBarProps extends WithStyles<typeof styles> {
  back: string;
  next: string;
}

export class UnstyledContinueBar extends React.Component<ContinueBarProps> {
  constructor(props: ContinueBarProps) {
    super(props);
  }

  public render() {
    const {
      back,
      next,
      classes: { root, buttonBar }
    } = this.props;
    return (
      <div className={root}>
        <div className={buttonBar}>
          <Details hideHelp to={back} iconType={DetailsIcons.backArrow} />
          <Details hideHelp to={next} iconType={DetailsIcons.nextArrow} />
        </div>
      </div>
    );
  }
}

export const ContinueBar = withStyles(styles)(UnstyledContinueBar);
