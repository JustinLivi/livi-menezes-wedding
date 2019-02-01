import Markdown from 'markdown-to-jsx';
import raw from 'raw.macro';
import * as React from 'react';

const DisclaimerText = raw('./index.md');

export const Disclaimer: React.SFC = () => (
  <Markdown>{DisclaimerText}</Markdown>
);
