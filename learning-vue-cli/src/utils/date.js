// 获取传入时间的年、月、日
export function getYearMonthDay(date) {
  let year = date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  return { year, month, day}
}

// 获取指定年月日的时间
export function getDate(year, month, day) {
  return new Date(year, month, day)
}
