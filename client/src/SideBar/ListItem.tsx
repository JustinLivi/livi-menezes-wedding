import { ListItem as CoreListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import * as React from 'react';

import { MenuLink } from '../Components/MenuLinks';

export interface IListItemProps {
  icon: React.ReactElement<any>;
  onClick?: React.MouseEventHandler;
  linkComponent: MenuLink;
  primary: string;
}

export const ListItem: React.SFC<IListItemProps> = ({
  icon,
  onClick,
  linkComponent,
  primary
}) => (
  <CoreListItem button component={linkComponent} onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={primary} />
  </CoreListItem>
);
