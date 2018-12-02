import { ListItemIcon, ListItemText, MenuItem as CoreMenuItem } from '@material-ui/core';
import { MenuItemProps as CoreMenuItemProps } from '@material-ui/core/MenuItem';
import * as React from 'react';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type MenuLink = React.ReactType<Omit<CoreMenuItemProps, 'innerRef'>>;

export interface MenuItemProps {
  icon: React.ReactElement<any>;
  onClick: React.MouseEventHandler;
  linkComponent: MenuLink;
  primary: string;
}

export const MenuItem: React.SFC<MenuItemProps> = ({
  icon,
  onClick,
  linkComponent,
  primary
}) => (
  <CoreMenuItem button={true} component={linkComponent} onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={primary} />
  </CoreMenuItem>
);
