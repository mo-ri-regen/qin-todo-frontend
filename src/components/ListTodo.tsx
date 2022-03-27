import { memo, useState } from "react";
import { getStringFromDate } from "src/libs/dateFunc";
import { useStore } from "src/libs/store";
import type { Target, TodosState } from "src/types";

import { AddTaskButton } from "./shared/Buttons/AddTaskButton";
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
  const [isInput, setIsInput] = useState<boolean>(false);

  const AddPcTaskButton = () => {
    const handleOnClick = () => {
      setIsInput(true);
    };
    const handleOnBlur = () => {
      setIsInput(false);
    };
    return (
      <div className="hidden lg:block">
        {isInput ? (
          <input
            onBlur={handleOnBlur}
            autoFocus
            className="px-2 w-4/5 rounded-full focus:outline-none"
          />
        ) : (
          <AddTaskButton onClick={handleOnClick} onBlur={handleOnBlur} />
        )}
      </div>
      // }
    );
  };

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
        <AddPcTaskButton />
      </ol>
    </div>
  );
});

ListTodo.displayName = "ListTodo";
