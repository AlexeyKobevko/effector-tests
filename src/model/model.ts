import { createDomain, forward } from 'effector';

export const myDomain = createDomain();

export const changeEvent = myDomain.createEvent<string>();

export const replaceFx = myDomain.createEffect<string, string>((str) => `${str} – TEST`);

export const $myStore = myDomain.createStore<string>('').on(replaceFx.doneData, (_, p) => p);

forward({
  from: changeEvent,
  to: replaceFx,
});
