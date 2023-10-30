import { atom } from 'recoil';

export const semesterState = atom({
  key: 'semesterState', // unique ID (with respect to other atoms/selectors)
  default: '학기 미정', // default value (aka initial value)
});

export const mileageStatusState = atom({
  key: 'mileageStatusState', // unique ID (with respect to other atoms/selectors)
  default: '진행 중', // default value (aka initial value)
});

export const userState = atom({
  key: 'userAtom', // unique ID (with respect to other atoms/selectors)
  default: {
    name: '김민수',
    sid: '2018000',
  },
});

export const IsShowStudentApplyModalState = atom({
  key: 'IsShowStudentApplyModalState', // unique ID (with respect to other atoms/selectors)
  default: false,
});
