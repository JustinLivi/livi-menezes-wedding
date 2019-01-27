import * as React from 'react';

import { ButtonBar } from './ButtonBar';
import { Chevron } from './Chevron';
import { ChevronIcons } from './ChevronIcon';

export interface ContinueBarProps {
  back: string;
  disableBack?: string;
  next: string;
  disableNext?: string;
  nextHelp?: string;
}

export const ContinueBar: React.SFC<ContinueBarProps> = ({
  back,
  disableBack,
  next,
  disableNext,
  nextHelp
}) => (
  <ButtonBar>
    <Chevron
      to={back}
      disabled={disableBack}
      iconType={ChevronIcons.backArrow}
      help='back'
    />
    <Chevron
      to={next}
      disabled={disableNext}
      iconType={ChevronIcons.nextArrow}
      help={nextHelp || 'next'}
    />
  </ButtonBar>
);
