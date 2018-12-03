import { ListItemIcon, ListItemText, MenuItem as CoreMenuItem } from '@material-ui/core';
import * as React from 'react';

import { MenuLink } from '../Components/MenuLinks';

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
