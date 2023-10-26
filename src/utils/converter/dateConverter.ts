export const dateConverter = (date: string) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const hour = dateObj.getHours();
  //   const minute = dateObj.getMinutes();
  //   const second = dateObj.getSeconds();
  return `${year}년 ${month}월 ${day}일 ${hour}시`;
};
