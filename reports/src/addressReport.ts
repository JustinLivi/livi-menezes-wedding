import { outputFile, readJson } from 'fs-extra';
import { Parser } from 'json2csv';

import { Profile } from './dataTypes';

const parser = new Parser<Profile>({
  fields: [
    {
      label: 'Name',
      value: 'name',
      default: ''
    },
    {
      label: 'Address',
      value: row => row.address || 'N/A'
    }
  ]
});

interface Payload {
  Items: Profile[];
}

const run = async () => {
  try {
    const res = await readJson('./data/raw.json');
    await outputFile(
      './data/addresses.csv',
      parser.parse((res as Payload).Items)
    );
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
    throw err;
  }
};

run();
