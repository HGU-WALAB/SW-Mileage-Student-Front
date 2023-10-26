import { atom } from 'recoil';

export const semesterState = atom({
  key: 'semesterState', // unique ID (with respect to other atoms/selectors)
  default: '2022-01', // default value (aka initial value)
});

export const mileageStatusState = atom({
  key: 'mileageStatusState', // unique ID (with respect to other atoms/selectors)
  default: '진행 중', // default value (aka initial value)
});
