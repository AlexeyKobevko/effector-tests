import { myDomain, $myStore, changeEvent, replaceFx } from './model';
import { fork, allSettled } from 'effector';

describe('model', () => {
  test('1', async () => {
    const scope = fork(myDomain, {
      handlers: new Map().set(replaceFx, () => 'MOCK'),
      // values: new Map([[$myStore, 'MOCK']]),
    });

    await allSettled(changeEvent, { scope, params: 'qwerty' });

    expect(scope.getState($myStore)).toEqual('MOCK');
  });
});
