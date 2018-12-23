import { Dictionary, fromPairs, map, toPairs } from 'lodash';

export const fromPromiseTuple: <T>(
  tuple: [string, Promise<T>]
) => Promise<[string, T]> = async ([key, promise]) => [key, await promise];

export const awaitMap = async <T>(
  dictionary: Dictionary<Promise<T>>
): Promise<Dictionary<T>> =>
  fromPairs(await Promise.all(map(toPairs(dictionary), fromPromiseTuple)));
