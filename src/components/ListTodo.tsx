import { memo, useState } from "react";
import { getStringFromDate } from "src/libs/dateFunc";
import { selectTodos, useStore } from "src/libs/store";
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

  const todos = selectTodos(allTodos, strDate, props.target);
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
          <input onBlur={handleOnBlur} autoFocus />
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
