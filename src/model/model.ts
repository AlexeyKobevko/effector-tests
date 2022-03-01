import { createDomain, forward } from 'effector';

export const myDomain = createDomain();

export const changeEvent = myDomain.createEvent<string>({ sid: 'changeEvent' });

export const replaceFx = myDomain.createEffect<string, string>({ sid: 'replaceFx' });
replaceFx.use((str) => `${str} – TEST`);

export const $myStore = myDomain
  .createStore<string>('', { sid: '$myStore' })
  .on(replaceFx.doneData, (_, p) => p);

forward({
  from: changeEvent,
  to: replaceFx,
});
