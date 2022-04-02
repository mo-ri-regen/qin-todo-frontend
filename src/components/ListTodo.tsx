import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
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
  const toggleIsAddInput = useStore((state) => {
    return state.toggleIsAddInput;
  });
  const date = new Date();
  const strDate = getStringFromDate(date);

  const todos = selectTodos(allTodos, strDate, props.target);
  const todoIds = todos.map((todoTask) => {
    return String(todoTask.id);
  });
  const [isInput, setIsInput] = useState<boolean>(false);

  const AddPcTaskButton = () => {
    const handleOnClick = () => {
      setIsInput(true);
      toggleIsAddInput(true);
    };
    const handleOnBlur = () => {
      setIsInput(false);
      toggleIsAddInput(false);
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

  const { setNodeRef } = useDroppable({
    id: props.target,
    data: {
      type: "container",
      children: todos,
    },
  });

  return (
    <div className="pt-3 w-full">
      <ol>
        <div
          ref={setNodeRef}
          style={
            {
              "--columns": 1,
            } as React.CSSProperties
          }
        >
          <SortableContext
            id={props.target}
            items={todoIds}
            strategy={verticalListSortingStrategy}
          >
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
          </SortableContext>
        </div>
      </ol>
    </div>
  );
});

ListTodo.displayName = "ListTodo";
