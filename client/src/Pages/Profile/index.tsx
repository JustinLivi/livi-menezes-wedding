import * as React from 'react';
import { match } from 'react-router-dom';

import { ButtonBar } from '../../ButtonBar';
import { ProfileContainer } from '../../Containers/ProfileContainer';
import { ColumnLayout } from '../../Layouts/ColumnLayout';

export interface ProfilePageProps {
  match: match<{ profileId: string }>;
}

export const ProfilePage: React.SFC<ProfilePageProps> = ({
  match: {
    params: { profileId }
  }
}) => (
  <ColumnLayout>
    <ProfileContainer profileId={profileId} />
    <ButtonBar toDetails='/details' />
  </ColumnLayout>
);
