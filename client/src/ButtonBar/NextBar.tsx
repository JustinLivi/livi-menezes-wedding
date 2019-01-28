import * as React from 'react';

import { ButtonBar } from './ButtonBar';
import { Chevron } from './Chevron';
import { ChevronIcons } from './ChevronIcon';

export interface NextBarProps {
  to: string;
  external?: boolean;
}

export const NextBar: React.SFC<NextBarProps> = ({ to, external }) => (
  <ButtonBar>
    <Chevron
      help='next'
      to={to}
      external={external}
      iconType={ChevronIcons.nextArrow}
    />
  </ButtonBar>
);
