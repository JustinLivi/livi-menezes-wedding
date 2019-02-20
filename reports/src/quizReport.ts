import { outputFile, readJson } from 'fs-extra';
import { json2csv, Parser } from 'json2csv';
import { concat, flatten, map, reduce } from 'lodash';

import { Profile } from './dataTypes';

export const questions = [
  {
    label: 'Dating App',
    answers: [
      'Tinder',
      'OkCupid',
      'Coffee meets Bagel',
      'Bumble',
      'Farmers Only'
    ]
  },
  {
    label: 'First Date',
    answers: [
      "Coffee Shop (Dooby's)",
      'Trivia Night (Alewife)',
      'Swing Dancing with high schoolers (Mobtown Ballroom)',
      "Local bluegrass night at an Irish pub (MJ O'Connor's)",
      'Drinks at the bar (Owl Bar)',
      'All of the above'
    ]
  },
  {
    label: 'Bond Over',
    answers: [
      'Our love of cats',
      'Our hatred of participating in community supported agriculture (CSA)',
      'Being Vegetarian',
      'Our tech talents',
      'Our love of dogs'
    ]
  },
  {
    label: 'Pets',
    answers: [
      'A Queen and a Prince',
      'A strong, independent woman and an anxious, whiny man',
      'A rapper and an English gentleman',
      'A Cat and a Dog',
      'Our little family',
      'All of the Above'
    ]
  },
  {
    label: 'Travel',
    answers: [
      'Anniversary trip to Spain',
      'Romantic getaway in Croatia',
      'Camping in Glacier National Park',
      'Wedding in California',
      'Cousins’ Weekend in Alabama'
    ]
  },
  {
    label: 'Engagement',
    answers: [
      'Slow dance in our living room',
      'Justin wrote a song',
      'At the top of a mountain',
      'Just talked about it',
      'All of the above'
    ]
  },
  {
    label: 'Venue',
    answers: [
      'We only looked at one venue',
      "It's in our old neighborhood",
      'We love Baltimore',
      "It's like Beauty and the Beast",
      'All of the above'
    ]
  }
];

const answerCols = flatten(
  map(questions, ({ label, answers }, index) => [
    {
      label,
      value: (row: Profile) =>
        !row.answers || !row.answers[index]
          ? ''
          : row.answers[index].correct
          ? 'Correct'
          : 'Incorrect'
    },
    {
      label: 'Selected',
      value: (row: Profile) =>
        !row.answers ||
        !row.answers[index] ||
        row.answers[index].answerId === undefined
          ? ''
          : answers[row.answers[index].answerId]
    }
  ])
);

const parser = new Parser<Profile>({
  fields: concat<string | json2csv.FieldInfo<Profile>>(
    [
      {
        label: 'Name',
        value: 'name',
        default: ''
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
    ],
    answerCols
  )
});

interface Payload {
  Items: Profile[];
}

const run = async () => {
  try {
    const res = await readJson('./data/raw.json');
    await outputFile(
      './data/quizReport.csv',
      parser.parse((res as Payload).Items)
    );
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err);
    throw err;
  }
};

run();
