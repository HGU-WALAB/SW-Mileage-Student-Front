export const dateConverter = (date?: string) => {
  const dateObj = new Date(date as string);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hour = dateObj.getHours();
  //   const minute = dateObj.getMinutes();
  //   const second = dateObj.getSeconds();
  return `${year}년 ${month}월 ${day}일 ${hour}시`;
};

export function parseMonthAndDay(dateTimeStr?: string) {
  const match = (dateTimeStr as string).match(/(\d{4})-(\d{2})-(\d{2})T/);
  if (match) {
    const [, , month, day] = match;
    return `${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  }
  return null;
}

export function daysBetween(date1Str?: string, date2Str?: string) {
  // 날짜 문자열을 Date 객체로 변환
  const date1 = new Date(date1Str as string);
  const date2 = new Date(date2Str as string);

  // 두 날짜의 차이를 밀리초로 계산
  const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());

  // 밀리초를 일로 변환
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  return Math.round(diffInDays);
}
