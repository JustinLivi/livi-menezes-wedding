import * as React from 'react';

import { ButtonBar } from './ButtonBar';
import { Chevron } from './Chevron';
import { ChevronIcons } from './ChevronIcon';

export interface ContinueBarProps {
  back: string;
  next: string;
}

export const ContinueBar: React.SFC<ContinueBarProps> = ({ back, next }) => (
  <ButtonBar>
    <Chevron to={back} iconType={ChevronIcons.backArrow} help='back' />
    <Chevron to={next} iconType={ChevronIcons.nextArrow} help='next' />
  </ButtonBar>
);
