import clsx from "clsx";
import { memo } from "react";

import { useStore } from "../libs/store";
import type { ListTodo, TodosState } from "../types";

type Props = {
  todo: ListTodo;
  target: "1" | "2" | "3";
};

export const TodoTody = memo<Props>((props) => {
  const toggleComplete = useStore((state: TodosState) => {
    return state.toggleDone;
  });
  const removeTodo = useStore((state: TodosState) => {
    return state.removeTodo;
  });
  return (
    <div className="flex items-center mb-4">
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
        checked={props.todo.done}
        // eslint-disable-next-line react/jsx-handler-names
        onChange={() => {
          toggleComplete(props.todo.id);
        }}
      />
      <div className={props.todo.done ? "line-through" : ""}>
        {props.todo.text}
      </div>
      <button
        className="p-1 ml-5 text-gray-100 hover:bg-red-400 rounded"
        // eslint-disable-next-line react/jsx-handler-names
        onClick={() => {
          return removeTodo(props.todo.id);
        }}
      >
        Delete
      </button>
    </div>
  );
});

TodoTody.displayName = "TodoTody";
