import {
  CardContent,
  createStyles,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';

import { ContinueBar } from '../../ButtonBar/ContinueBar';
import { StandardCard } from '../../Components/StandardCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';

const styles = createStyles({
  ul: {
    paddingBottom: 2,
    paddingTop: 2
  }
});

export const UnstyledWhereToStayDetails: React.SFC<
  WithStyles<typeof styles>
> = ({ classes: { ul } }) => (
  <ColumnLayout>
    <StandardCard>
      <CardContent>
        <Typography variant='h4' component='h1'>
          Hotel Blocks
        </Typography>
        <hr />
        <Typography variant='body1' component='p' gutterBottom>
          If you have any questions about where to stay in Baltimore, feel free
          to reach out! We are happy to provide suggestions/advice!
        </Typography>
        <Typography variant='h6' component='h2'>
          <Link
            target='_blank'
            href='https://www.jdvhotels.com/hotels/maryland/baltimore/hotel-revival-baltimore'
          >
            Hotel Revival
          </Link>
        </Typography>
        <Typography variant='body1' component='p' gutterBottom>
          Book via&nbsp;
          <Link href='https://gc.synxis.com/rez.aspx?Hotel=68042&Chain=15564&arrive=10/12/2019&depart=10/14/2019&adult=1&child=0&group=ME101119RV&chain=15564&BRAND=JV&template=JV_RBE&shell=JV_RBE'>
            Joie de Vivre
          </Link>
          &nbsp;or call&nbsp;
          <Link href='tel:+1-407-745-3477'>+1 (407) 745-3477</Link>. We are
          under the <strong>Livi Menezes Wedding Block</strong>.
        </Typography>
        <Typography variant='h6' component='h2'>
          <Link target='_blank' href='https://www.monaco-baltimore.com/'>
            Hotel Monaco
          </Link>
        </Typography>
        <Typography variant='body1' component='p' gutterBottom>
          <Link href='tel:+1-888-752-2636'>+1 (888) 752-2636</Link>. We are
          under the <strong>Livi Menezes Wedding Block</strong> or use
          code&nbsp;
          <strong>AP8</strong>.
        </Typography>
        <Typography variant='h6' component='h2'>
          <Link
            target='_blank'
            href='https://www.redlion.com/hotel-rl/md/baltimore/hotel-rl-baltimore-inner-harbor'
          >
            Hotel RL
          </Link>
        </Typography>
        <List dense>
          <ListItem className={ul}>
            <ListItemText
              primary={
                <React.Fragment>
                  1. &nbsp;
                  <Link
                    target='_blank'
                    href='https://www.redlion.com/hotel-rl/md/baltimore/hotel-rl-baltimore-inner-harbor#room-types'
                  >
                    Click here
                  </Link>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem className={ul}>
            <ListItemText primary='2. Select the Check-In and Check-Out dates at the top of the page.' />
          </ListItem>
          <ListItem className={ul}>
            <ListItemText
              primary={
                <React.Fragment>
                  3. Select the Discounts drop-down menu and enter the group
                  code <strong>MENE1011</strong> to verify.
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem className={ul}>
            <ListItemText primary='4. Group rates will display at the bottom of the screen.' />
          </ListItem>
        </List>
        <Typography variant='h6' component='h2'>
          <Link
            target='_blank'
            href='https://www.airbnb.com/s/Baltimore--MD--United-States/homes?refinement_paths%5B%5D=%2Fhomes&query=Baltimore%2C%20MD%2C%20United%20States&place_id=ChIJt4P01q4DyIkRWOcjQqiWSAQ&allow_override%5B%5D=&s_tag=oQMKVGGn'
          >
            AirBnB
          </Link>
        </Typography>
      </CardContent>
    </StandardCard>
    <ContinueBar back='/where-to-stay' next='/registry' />
  </ColumnLayout>
);

export const WhereToStayDetails = withStyles(styles)(
  UnstyledWhereToStayDetails
);
