import { outputFile, readJson } from 'fs-extra';
import { Parser } from 'json2csv';
import { reduce } from 'lodash';

import { Profile } from './dataTypes';

const parser = new Parser<Profile>({
  fields: [
    {
      label: 'Name',
      value: 'name',
      default: ''
    },
    {
      label: 'Attending Wedding',
      value: row =>
        row.attendingWedding === undefined
          ? 'Pending'
          : row.attendingWedding
          ? 'Attending'
          : 'Not Attending'
    },
    {
      label: 'Attending Rehearsal Dinner',
      value: row =>
        !row.rehearsal
          ? 'N/A'
          : row.attendingRehearsal === undefined
          ? 'Pending'
          : row.attendingRehearsal
          ? 'Attending'
          : 'Not Attending'
    },
    {
      label: 'Answers Correct',
      value: row =>
        `${reduce(
          row.answers,
          (totalCount, answer) =>
            totalCount + (answer && answer.correct ? 1 : 0),
          0
        ) || ''}`
    },
    {
      label: 'Answers Attempted',
      value: row =>
        `${reduce(
          row.answers,
          (totalCount, answer) => totalCount + (answer ? 1 : 0),
          0
        ) || ''}`
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
      './data/basicReport.csv',
      parser.parse((res as Payload).Items)
    );
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
    throw err;
  }
};

run();
