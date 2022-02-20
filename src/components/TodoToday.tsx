import { useStore } from "../libs/store";
import type { Todo as TodoType, TodosState } from "../types";

export const TodoTody = (props: TodoType & { index: number }) => {
  const toggleComplete = useStore((state: TodosState) => {
    return state.toggleDone;
  });
  const removeTodo = useStore((state: TodosState) => {
    return state.removeTodo;
  });
  return (
    <div className="flex items-center mb-4">
      <input
        className="mr-4 w-6 h-6 text-primary rounded-full ring-0 focus:ring-gray-400"
        type="checkbox"
        checked={props.done}
        // eslint-disable-next-line react/jsx-handler-names
        onChange={() => {
          toggleComplete(props.index);
        }}
      />
      <div className={props.done ? "line-through" : ""}>{props.text}</div>
      <button
        className="p-1 ml-5 text-gray-100 hover:bg-red-400 rounded"
        // eslint-disable-next-line react/jsx-handler-names
        onClick={() => {
          return removeTodo(props.index);
        }}
      >
        Delete
      </button>
    </div>
  );
};
