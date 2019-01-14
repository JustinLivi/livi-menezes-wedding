import { CardContent, createStyles, Typography, WithStyles, withStyles } from '@material-ui/core';
import classnames from 'classnames';
import { get } from 'lodash';
import * as React from 'react';

import { ButtonBar } from '../../ButtonBar';
import { AddressInput } from '../../Components/AddressInput';
import { StandardCard } from '../../Components/StandardCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';

const styles = createStyles({
  content: {
    paddingTop: 25,
    textAlign: 'center'
  },
  hr: {
    marginBottom: 15,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 15
  },
  italic: {
    fontStyle: 'italic'
  },
  names: {
    letterSpacing: 5
  },
  standardCard: {
    overflow: 'initial',
    position: 'relative'
  },
  topName: {
    marginBottom: 0
  }
});

export interface CantMakeItProps extends WithStyles<typeof styles> {}

export class UnstyledCantMakeIt extends React.Component<CantMakeItProps> {
  constructor(props: CantMakeItProps) {
    super(props);
  }

  public handleChange = (event: Event) => {
    this.setState({
      address: get(event, 'target.value')
    });
  };

  public render() {
    const {
      classes: { content, topName, names, hr, italic, standardCard }
    } = this.props;
    return (
      <ColumnLayout>
        <StandardCard className={standardCard}>
          <CardContent className={content}>
            <Typography
              className={italic}
              gutterBottom
              variant='body1'
              component='p'
            >
              Can't Make It
            </Typography>
            <Typography
              className={classnames(names, topName)}
              variant='h6'
              component='p'
            >
              We will miss you!
            </Typography>
            <AddressInput />
          </CardContent>
        </StandardCard>
        <ButtonBar toDetails='/details' />
      </ColumnLayout>
    );
  }
}

export const CantMakeIt = withStyles(styles)(UnstyledCantMakeIt);
