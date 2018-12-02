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
import { Link } from 'react-router-dom';

import { MenuItem, MenuLink } from './MenuItem';

const styles = createStyles({
  iconButton: {
    width: '3em',
    height: '3em'
  },
  menu: {
    width: '2em',
    height: '2em'
  },
  root: {
    flexGrow: 1,
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

  RsvpLink: MenuLink = props => <Link to='/' {...props} />;
  OurStoryLink: MenuLink = props => <Link to='/our-story' {...props} />;
  VenueLink: MenuLink = props => <Link to='/venue' {...props} />;
  DirectionsLink: MenuLink = props => <Link to='/directions' {...props} />;
  WhereToStayLink: MenuLink = props => <Link to='/where-to-stay' {...props} />;
  ThingsToDoLink: MenuLink = props => <Link to='/things-to-do' {...props} />;

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
          id='simple-menu'
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={this.handleClose}
        >
          <MenuItem
            icon={<EmailRounded />}
            linkComponent={this.RsvpLink}
            onClick={this.handleClose}
            primary='RSVP'
          />
          <MenuItem
            icon={<People />}
            linkComponent={this.OurStoryLink}
            onClick={this.handleClose}
            primary='Our Story'
          />
          <MenuItem
            icon={<LocationCityRounded />}
            linkComponent={this.VenueLink}
            onClick={this.handleClose}
            primary='Venue'
          />
          <MenuItem
            icon={<LocationOn />}
            linkComponent={this.DirectionsLink}
            onClick={this.handleClose}
            primary='Directions'
          />
          <MenuItem
            icon={<Hotel />}
            linkComponent={this.WhereToStayLink}
            onClick={this.handleClose}
            primary='Where to Stay'
          />
          <MenuItem
            icon={<LocalCafe />}
            linkComponent={this.ThingsToDoLink}
            onClick={this.handleClose}
            primary='Things to Do'
          />
        </Menu>
      </span>
    );
  }
}

export const Hamburger = withStyles(styles)(UnstyledHamburger);
