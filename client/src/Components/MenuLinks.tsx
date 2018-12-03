import { MenuItemProps } from '@material-ui/core/MenuItem';
import * as React from 'react';
import { Link } from 'react-router-dom';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type MenuLink = React.ReactType<Omit<MenuItemProps, 'innerRef'>>;

export const RsvpLink: MenuLink = props => <Link to='/' {...props} />;

export const OurStoryLink: MenuLink = props => (
  <Link to='/our-story' {...props} />
);

export const VenueLink: MenuLink = props => <Link to='/venue' {...props} />;

export const DirectionsLink: MenuLink = props => (
  <Link to='/directions' {...props} />
);

export const WhereToStayLink: MenuLink = props => (
  <Link to='/where-to-stay' {...props} />
);

export const ThingsToDoLink: MenuLink = props => (
  <Link to='/things-to-do' {...props} />
);
