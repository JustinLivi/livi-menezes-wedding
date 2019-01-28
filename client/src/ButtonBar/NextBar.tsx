import * as React from 'react';

import { ButtonBar } from './ButtonBar';
import { Chevron } from './Chevron';
import { ChevronIcons } from './ChevronIcon';

export interface NextBarProps {
  to: string;
  help?: string;
  external?: boolean;
  iconType?: ChevronIcons;
}

export const NextBar: React.SFC<NextBarProps> = ({
  to,
  external,
  help,
  iconType
}) => (
  <ButtonBar>
    <Chevron
      help={help || 'next'}
      to={to}
      external={external}
      iconType={iconType || ChevronIcons.nextArrow}
    />
  </ButtonBar>
);
