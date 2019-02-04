import { createStyles, Grid, Link, Typography, WithStyles, withStyles } from '@material-ui/core';
import { TypographyProps } from '@material-ui/core/Typography';
import Markdown from 'markdown-to-jsx';
import raw from 'raw.macro';
import * as React from 'react';

const DisclaimerText = raw('./index.md');

const styles = createStyles({
  container: {
    maxWidth: 800
  }
});

const P: React.SFC<TypographyProps> = props => (
  <Typography {...props} gutterBottom />
);

export const UnstyledDisclaimer: React.SFC<WithStyles<typeof styles>> = ({
  classes: { container }
}) => (
  <Grid container direction='row' justify='center'>
    <Grid container className={container}>
      <Markdown
        options={{
          overrides: {
            a: Link,
            p: P
          }
        }}
      >
        {DisclaimerText}
      </Markdown>
    </Grid>
  </Grid>
);

export const Disclaimer = withStyles(styles)(UnstyledDisclaimer);
