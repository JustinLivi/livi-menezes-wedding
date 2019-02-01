declare module 'markdown-to-jsx' {
  import * as React from 'react';
  export interface MarkdownProps {
    options?: {
      forceBlock?: boolean;
      forceInline?: boolean;
    };
  }
  export default class Markdown extends React.Component<MarkdownProps> {}
}
