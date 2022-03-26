import { memo } from "react";
import { useStore } from "src/libs/store";
import type { Target, TodosState } from "src/types";

import { TodoRecord } from "./TodoRecord";

type Props = {
  title?: string;
  target: Target;
  length?: number;
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
  const todosLen = allTodos.filter((todo) => {
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
  }).length;

  return (
    <div className="pt-3 w-full">
      <ol>
        {todos.map((todo) => {
          return (
            <TodoRecord
              todo={todo}
              key={`todo-${todo.task}-${todo.id}`}
              target={props.target}
              length={todosLen}
            />
          );
        })}
      </ol>
    </div>
  );
});

ListTodo.displayName = "ListTodo";
