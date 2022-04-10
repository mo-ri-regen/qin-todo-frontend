import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { memo, useState } from "react";
import { getToday } from "src/libs/dateFunc";
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
  const strDate = getToday();

  const todos = selectTodos(allTodos, strDate, props.target);
  const todoIds = todos.map((todoTask) => {
    return String(todoTask.id);
  });
  const [isInput, setIsInput] = useState<boolean>(false);

  const AddPcTaskButton = () => {
    const [inputTodo, setInputTodo] = useState<string>("");
    const handleOnClick = () => {
      setIsInput(true);
    };
    const handleOnBlur = () => {
      setIsInput(false);
    };
    const handleOnChange = (e: any) => {
      setInputTodo(e.target.value);
    };

    const handleSubmit = (e: any) => {
      e.preventDefault();
      if (inputTodo === "") {
        return;
      } else {
        alert(`entered text is ${inputTodo}`);
        setInputTodo("");
      }
    };

    return (
      <div className="hidden lg:block">
        {isInput ? (
          <form onSubmit={handleSubmit}>
            <input
              onBlur={handleOnBlur}
              autoFocus
              className="px-2 w-4/5 h-10 text-gray-400 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
              maxLength={200}
              onChange={handleOnChange}
              value={inputTodo}
            />
          </form>
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
