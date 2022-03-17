import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { memo, useState } from "react";

import { useStore } from "../libs/store";
import type { ListTodo, TodosState } from "../types";

type Props = {
  todo: ListTodo;
  target: "1" | "2" | "3";
};

export const TodoRecord = memo<Props>((props) => {
  const toggleComplete = useStore((state: TodosState) => {
    return state.toggleDone;
  });
  const handleToggleComplete = () => {
    toggleComplete(props.todo);
  };
  const removeTodo = useStore((state: TodosState) => {
    return state.removeTodo;
  });
  const handleRemoveTodo = () => {
    return removeTodo(props.todo.id);
  };
  const handleDupulicateTodo = () => {
    return alert("複製する処理");
  };
  const [isHover, setIsHover] = useState(false);
  const handleHover = () => {
    setIsHover(true);
  };
  const handleHoverLeave = () => {
    setIsHover(false);
  };
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex">
        <input
          className={clsx(
            "mr-4 w-6 h-6 rounded-full ring-0 focus:ring-gray-400",
            {
              "text-primary": props.target == "1",
              "text-secondary": props.target == "2",
              "text-tertiary": props.target == "3",
            }
          )}
          type="checkbox"
          checked={props.todo.isDone}
          onClick={handleToggleComplete}
        />
        <div
          className={props.todo.isDone ? "line-through" : ""}
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverLeave}
        >
          {props.todo.task}
        </div>
      </div>
      <div className="flex">
        <button className="p-1 ml-5" onClick={handleDupulicateTodo}>
          <DocumentDuplicateIcon
            className={
              isHover
                ? "w-5 h-5 text-gray-500 dark:text-white opacity-100"
                : "w-5 h-5 text-gray-500 dark:text-white opacity-5"
            }
          />
        </button>
        <button className="p-1 sm:mx-3" onClick={handleRemoveTodo}>
          <TrashIcon
            className={
              isHover
                ? "w-5 h-5 text-gray-500 dark:text-white opacity-100"
                : "w-5 h-5 text-gray-500 dark:text-white opacity-5"
            }
          />
        </button>
      </div>
    </div>
  );
});

TodoRecord.displayName = "TodoRecord";
