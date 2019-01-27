import * as React from 'react';

import { NextBar } from '../../ButtonBar/NextBar';
import { StandardCard } from '../../Components/StandardCard';
import { ColumnLayout } from '../../Layouts/ColumnLayout';
import { ZolaLogo } from './ZolaLogo';

export const Registry: React.SFC = () => (
  <ColumnLayout>
    <StandardCard>
      <a
        className='zola-registry-embed'
        href='www.zola.com/registry/livimenezeswedding'
        data-registry-key='livimenezeswedding'
      >
        Our Zola Wedding Registry
        <ZolaLogo />
      </a>
      <div>
        If you would prefer to write a check as a gift, please make it out to
        “Marisa Menezes and Justin Livi.” We appreciate your thoughtfulness and
        generosity!
      </div>
    </StandardCard>
    <NextBar to='/things-to-do/details' />
  </ColumnLayout>
);
