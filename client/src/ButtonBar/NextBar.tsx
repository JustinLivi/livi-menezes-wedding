import * as React from 'react';

import { ButtonBar } from './ButtonBar';
import { Details, DetailsIcons } from './Details';

export interface NextBarProps {
  to: string;
  external?: boolean;
}

export const NextBar: React.SFC<NextBarProps> = ({ to, external }) => (
  <ButtonBar>
    <Details
      help='next'
      to={to}
      external={external}
      iconType={DetailsIcons.nextArrow}
    />
  </ButtonBar>
);
