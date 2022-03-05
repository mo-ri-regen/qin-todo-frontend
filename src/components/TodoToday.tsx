import { TrashIcon } from "@heroicons/react/outline";
import type { VFC } from "react";

import { useStore } from "../libs/store";
import type { ListTodo, TodosState } from "../types";

type Props = {
  todo: ListTodo;
};

export const TodoTody: VFC<Props> = (props) => {
  const toggleComplete = useStore((state: TodosState) => {
    return state.toggleDone;
  });
  const handleToggleComplete = () => {
    toggleComplete(props.todo.id);
  };
  const removeTodo = useStore((state: TodosState) => {
    return state.removeTodo;
  });
  const handleRemoveTodo = () => {
    return removeTodo(props.todo.id);
  };
  return (
    <div className="flex items-center mb-4">
      <input
        className="mr-4 w-6 h-6 text-primary rounded-full ring-0 focus:ring-gray-400"
        type="checkbox"
        checked={props.todo.done}
        onChange={handleToggleComplete}
      />
      <div className={props.todo.done ? "line-through" : ""}>
        {props.todo.text}
      </div>
      <button
        className="p-1 ml-5 text-gray-100 hover:bg-red-400 rounded"
        // eslint-disable-next-line react/jsx-handler-names
        onClick={handleRemoveTodo}
      >
        <TrashIcon className="w-5 h-5 text-gray-800 dark:text-white " />
      </button>
    </div>
  );
};
