import { emptyDir, outputJson } from 'fs-extra';
import { Parser } from 'json2csv';
import { reduce } from 'lodash';

import { dynamo, DYNAMODB_PROFILE_TABLE } from './config';

interface Answer {
  answerId: number;
  correct: boolean;
}

interface Profile {
  relationships?: string[];
  address?: string;
  rehearsal?: true;
  dietaryRestrictions?: string;
  attendingRehearsal: boolean;
  profile?: {
    about?: string;
    photo?: string;
  };
  answers: Answer[];
  favoriteDanceSong?: string;
  name: string;
  attendingWedding?: boolean;
  id: string;
}

const parser = new Parser<Profile>({
  fields: [
    {
      label: 'Name',
      value: 'name',
      default: ''
    },
    {
      label: 'Attending Wedding',
      value: 'attendingWedding',
      default: 'Pending'
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
        ) || 0}`
    },
    {
      label: 'Answers Attempted',
      value: row =>
        `${reduce(
          row.answers,
          (totalCount, answer) => totalCount + (answer ? 1 : 0),
          0
        ) || 0}`
    }
  ]
});

interface Payload {
  Items: Profile[];
}

const run = async () => {
  try {
    const res = await new Promise((resolve, reject) =>
      dynamo.scan(
        {
          TableName: DYNAMODB_PROFILE_TABLE
        },
        (err, data) => {
          if (err) {
            return reject(err);
          }
          resolve(data);
        }
      )
    );
    await emptyDir('./data');
    await outputJson('./data/raw.json', res);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
    throw err;
  }
};

run();
