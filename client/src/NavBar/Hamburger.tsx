import { createStyles, IconButton, Menu, WithStyles, withStyles } from '@material-ui/core';
import {
  Description,
  EmailRounded,
  Hotel,
  LocalCafe,
  LocationCityRounded,
  LocationOn,
  Menu as MenuIcon,
  People,
} from '@material-ui/icons';
import * as React from 'react';

import {
  DetailsLink,
  DirectionsLink,
  OurStoryLink,
  RsvpLink,
  ThingsToDoLink,
  VenueLink,
  WhereToStayLink,
} from '../Components/MenuLinks';
import { theme } from '../theme';
import { MenuItem } from './MenuItem';

const styles = createStyles({
  iconButton: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'initial'
    },
    height: '3em',
    width: '3em'
  },
  menu: {
    height: '2em',
    width: '2em'
  },
  root: {
    display: 'flex',
    flexDirection: 'row-reverse',
    flexGrow: 1,
    width: '33%'
  }
});

export interface HamburgerProps extends WithStyles<typeof styles> {}

export interface HamburgerState {
  anchorEl: Element | null;
}

export class UnstyledHamburger extends React.Component<
  HamburgerProps,
  HamburgerState
> {
  public state = {
    anchorEl: null
  };

  public handleClick: React.MouseEventHandler = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  public handleClose = () => {
    this.setState({ anchorEl: null });
  };

  public render() {
    const {
      classes: { root, iconButton, menu }
    } = this.props;
    const { anchorEl } = this.state;
    return (
      <span className={root}>
        <IconButton
          className={iconButton}
          color='inherit'
          aria-label='Menu'
          onClick={this.handleClick}
        >
          <MenuIcon classes={{ root: menu }} />
        </IconButton>
        <Menu
          color='primary'
          id='simple-menu'
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={this.handleClose}
        >
          <MenuItem
            icon={<Description />}
            linkComponent={DetailsLink}
            onClick={this.handleClose}
            primary='Invitation'
          />
          <MenuItem
            icon={<EmailRounded />}
            linkComponent={RsvpLink}
            onClick={this.handleClose}
            primary='RSVP'
          />
          <MenuItem
            icon={<People />}
            linkComponent={OurStoryLink}
            onClick={this.handleClose}
            primary='Our Story'
          />
          <MenuItem
            icon={<LocationCityRounded />}
            linkComponent={VenueLink}
            onClick={this.handleClose}
            primary='Venue'
          />
          <MenuItem
            icon={<LocationOn />}
            linkComponent={DirectionsLink}
            onClick={this.handleClose}
            primary='Directions'
          />
          <MenuItem
            icon={<Hotel />}
            linkComponent={WhereToStayLink}
            onClick={this.handleClose}
            primary='Where to Stay'
          />
          <MenuItem
            icon={<LocalCafe />}
            linkComponent={ThingsToDoLink}
            onClick={this.handleClose}
            primary='Things to Do'
          />
        </Menu>
      </span>
    );
  }
}

export const Hamburger = withStyles(styles)(UnstyledHamburger);
