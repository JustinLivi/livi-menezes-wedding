import { Tooltip } from '@material-ui/core';
import { TooltipProps } from '@material-ui/core/Tooltip';
import * as React from 'react';

import { Omit } from '../Util/util';

export interface DisabledTooltipProps
  extends Omit<TooltipProps, 'title' | 'aria-label'> {
  children: React.ReactElement<any>;
  help?: string;
  disabled?: boolean;
}

export const DisabledTooltip: React.SFC<DisabledTooltipProps> = ({
  help,
  children,
  disabled,
  ...props
}) =>
  disabled && help ? (
    <Tooltip {...props} title={help} aria-label={help} placement='top'>
      {children}
    </Tooltip>
  ) : (
    <React.Fragment>{children}</React.Fragment>
  );
