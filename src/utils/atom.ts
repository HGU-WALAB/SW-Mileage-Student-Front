import { atom } from 'recoil';

export const semesterState = atom({
  key: 'semesterState', // unique ID (with respect to other atoms/selectors)
  default: '2022-01', // default value (aka initial value)
});
