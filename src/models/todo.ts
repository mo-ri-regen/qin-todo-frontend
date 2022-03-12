import type { ListTodo } from "src/types";

// 当日
const getToday = () => {
  const date = new Date();
  const year_str: string = date.getFullYear().toString();
  //月だけ+1すること
  const month_str: string = 1 + date.getMonth().toString();
  const day_str: string = date.getDate().toString();

  let format_str = "YYYY-MM-DD hh:mm:ss";
  format_str = format_str.replace(/YYYY/g, year_str);
  format_str = format_str.replace(/MM/g, month_str);
  format_str = format_str.replace(/DD/g, day_str);
  return format_str;
};

// 翌日
const getTommorow = () => {
  const date = new Date();
  const year_str: string = date.getFullYear().toString();
  //月だけ+1すること
  const month_str: string = 1 + date.getMonth().toString();
  const day_str: string = date.setDate(date.getDate() + 1).toString();

  let format_str = "YYYY-MM-DD hh:mm:ss";
  format_str = format_str.replace(/YYYY/g, year_str);
  format_str = format_str.replace(/MM/g, month_str);
  format_str = format_str.replace(/DD/g, day_str);
  return format_str;
};

export const EXAMPLE_MY_TODO_LIST: ListTodo[] = [
  {
    id: "5",
    task: `書籍を使って学ぶのは本当に必要なのか考察する。`,
    userId: "",
    sortKey: 1,
    dueDate: getToday(),
    completeDate: "",
    isDone: false,
    createAt: getToday(),
    updateAt: "2022-03-01",
  },
  {
    id: "4",
    task: `HTML・CSS・JavaScriptの実践。`,
    userId: "",
    sortKey: 2,
    dueDate: getToday(),
    completeDate: getToday(),
    isDone: true,
    createAt: getToday(),
    updateAt: getToday(),
  },
  {
    id: "3",
    task: `3年後にどうなっていたいかを考える。`,
    userId: "",
    sortKey: 3,
    dueDate: getTommorow(),
    completeDate: "",
    isDone: false,
    createAt: getToday(),
    updateAt: getToday(),
  },
  {
    id: "2",
    task: `TypeScriptが何か調べてる。`,
    userId: "",
    sortKey: 4,
    dueDate: "",
    completeDate: "",
    isDone: false,
    createAt: getToday(),
    updateAt: getToday(),
  },
  {
    id: "1",
    task: `Reactのチュートリアルを学んでみた感想まとめる。`,
    userId: "",
    sortKey: 5,
    dueDate: getToday(),
    completeDate: getTommorow(),
    isDone: true,
    createAt: getToday(),
    updateAt: getTommorow(),
  },
];
