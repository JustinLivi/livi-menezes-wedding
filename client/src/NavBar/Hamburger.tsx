import { createStyles, IconButton, Menu, WithStyles, withStyles } from '@material-ui/core';
import {
  EmailRounded,
  Hotel,
  LocalCafe,
  LocationCityRounded,
  LocationOn,
  Menu as MenuIcon,
  People,
} from '@material-ui/icons';
import * as React from 'react';

import { DirectionsLink, OurStoryLink, RsvpLink, ThingsToDoLink, VenueLink, WhereToStayLink } from '../Components/MenuLinks';
import { theme } from '../theme';
import { MenuItem } from './MenuItem';

const styles = createStyles({
  iconButton: {
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'initial'
    },
    width: '3em',
    height: '3em'
  },
  menu: {
    width: '2em',
    height: '2em'
  },
  root: {
    flexGrow: 1,
    width: '33%',
    display: 'flex',
    flexDirection: 'row-reverse'
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
  state = {
    anchorEl: null
  };

  handleClick: React.MouseEventHandler = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
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
