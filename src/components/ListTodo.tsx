import clsx from "clsx";
import { memo } from "react";
// import { useState } from "react";
import { useStore } from "src/libs/store";
import type { Target, TodosState } from "src/types";

import { TodoRecord } from "./TodoRecord";

type Props = {
  title: string;
  target: Target;
};

const getStringFromDate = (date: Date) => {
  const year_str: string = date.getFullYear().toString();
  //月だけ+1すること
  const month_str: string = 1 + date.getMonth().toString();
  const day_str: string = date.getDate().toString();

  let format_str = "YYYY-MM-DD";
  format_str = format_str.replace(/YYYY/g, year_str);
  format_str = format_str.replace(/MM/g, month_str);
  format_str = format_str.replace(/DD/g, day_str);
  return format_str;
};

export const ListTodo = memo<Props>((props) => {
  const allTodos = useStore((state: TodosState) => {
    return state.todos;
  });
  const date = new Date();
  const strDate = getStringFromDate(date);

  const todos = allTodos.filter((todo) => {
    switch (props.target) {
      case "3": // 「今度やる」のデータ抽出
        return todo.dueDate == "";
      case "2": // 「明日やる」のデータ抽出
        return todo.dueDate > strDate && todo.completeDate == "";
      case "1": // 「今日やる」のデータ抽出
        return (
          (todo.dueDate <= strDate && todo.dueDate != "") ||
          todo.completeDate != ""
        );
    }
  });

  // const [inputTodo, setInputTodo] = useState<string>("");

  // const addTodo = useStore((state) => {
  //   return state.addTodo;
  // });
  // const [error, setError] = useState(" ");
  // const [isFooterShow, setIsFooterShow] = useState(false);
  const toggleIsFooterShow = useStore((state) => {
    return state.toggleIsFooterShow;
  });

  const handleOnToggleFooter = () => {
    toggleIsFooterShow();
  };

  return (
    <div className="w-full lg:w-1/3">
      <div
        className={clsx("mb-3 text-2xl font-semibold", {
          "text-primary": props.target == "1",
          "text-secondary": props.target == "2",
          "text-tertiary": props.target == "3",
        })}
      >
        {props.title}
      </div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <button
            className="px-2 mr-2 w-6 h-6 text-white bg-gray-300 rounded-full"
            onClick={handleOnToggleFooter}
          >
            +
          </button>
          <div className="text-gray-300">タスクを追加する</div>
        </div>
        <div className="overflow-y-auto my-5 w-full h-full max-h-72">
          <ul>{/* ここにmockのデータを取得したい */}</ul>
          <ol>
            {todos.map((todo) => {
              return (
                <TodoRecord
                  todo={todo}
                  key={`todo-${todo.task}-${todo.id}`}
                  target={props.target}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
});

ListTodo.displayName = "ListTodo";
