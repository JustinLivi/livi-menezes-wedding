// tslint:disable-next-line:no-implicit-dependencies
import 'jest-extended';

import { handler } from '.';

describe('handler', () => {
  it('should be a function', () => {
    expect(handler).toBeFunction();
  });
});
