import type { Target } from "src/types";

// 当日
export const getToday = () => {
  const date = new Date();
  return getStringFromDate(date);
};

// 翌日
export const getTommorow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return getStringFromDate(date);
};

// 現在の日付
export const getStringFromDate = (date: Date) => {
  const year_str: string = date.getFullYear().toString();
  //月だけ+1すること
  const month_str: string = (date.getMonth() + 1).toString();
  const day_str: string = date.getDate().toString();

  let format_str = "YYYY-MM-DD";
  format_str = format_str.replace(/YYYY/g, year_str);
  format_str = format_str.replace(/MM/g, month_str);
  format_str = format_str.replace(/DD/g, day_str);
  return format_str;
};

export const targetCheck = (dueDate: string | null) => {
  const today = getToday();
  const nextday = getTommorow();

  let target: Target;
  switch (dueDate) {
    case today:
      target = "today";
      break;
    case nextday:
      target = "nextday";
      break;
    default:
      target = "other";
      break;
  }
  return target;
};
