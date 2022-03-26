import { memo } from "react";
import { getStringFromDate } from "src/libs/dateFunc";
import { useStore } from "src/libs/store";
import type { Target, TodosState } from "src/types";

import { TodoRecord } from "./TodoRecord";

type Props = {
  title?: string;
  target: Target;
  length?: number;
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

  return (
    <div className="pt-3 w-full">
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
  );
});

ListTodo.displayName = "ListTodo";
