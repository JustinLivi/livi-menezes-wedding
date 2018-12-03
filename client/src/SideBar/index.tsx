import { createStyles, Divider, Drawer, List, WithStyles, withStyles } from '@material-ui/core';
import { EmailRounded, Hotel, LocalCafe, LocationCityRounded, LocationOn, People } from '@material-ui/icons';
import * as React from 'react';

import { DirectionsLink, OurStoryLink, RsvpLink, ThingsToDoLink, VenueLink, WhereToStayLink } from '../Components/MenuLinks';
import { theme } from '../theme';
import { ListItem } from './ListItem';

const drawerWidth = 240;

const styles = createStyles({
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  drawer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
    width: drawerWidth,
    flexShrink: 0
  }
});

export interface SideBarProps extends WithStyles<typeof styles> {}

export const UnstyledSideBar: React.SFC<SideBarProps> = ({
  classes: { toolbar, drawerPaper, drawer }
}) => (
  <Drawer
    className={drawer}
    variant='permanent'
    anchor='left'
    classes={{
      paper: drawerPaper
    }}
  >
    <div className={toolbar} />
    <Divider />
    <List>
      <ListItem
        icon={<EmailRounded />}
        linkComponent={RsvpLink}
        primary='RSVP'
      />
      <ListItem
        icon={<People />}
        linkComponent={OurStoryLink}
        primary='Our Story'
      />
      <ListItem
        icon={<LocationCityRounded />}
        linkComponent={VenueLink}
        primary='Venue'
      />
      <ListItem
        icon={<LocationOn />}
        linkComponent={DirectionsLink}
        primary='Directions'
      />
      <ListItem
        icon={<Hotel />}
        linkComponent={WhereToStayLink}
        primary='Where to Stay'
      />
      <ListItem
        icon={<LocalCafe />}
        linkComponent={ThingsToDoLink}
        primary='Things to Do'
      />
    </List>
  </Drawer>
);

export const SideBar = withStyles(styles)(UnstyledSideBar);
