import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { memo, useRef } from "react";

import { useStore } from "../libs/store";
import type { ListTodo, Target, TodosState } from "../types";

type Props = {
  todo: ListTodo;
  target: Target;
};

export const TodoRecordMobile = memo<Props>((props) => {
  const toggleComplete = useStore((state: TodosState) => {
    return state.toggleDone;
  });
  const handleToggleComplete = () => {
    toggleComplete(props.todo);
  };
  const setEditTodo = useStore((state) => {
    return state.setEditTodo;
  });
  const handleEditTodoMobile = () => {
    setEditTodo(props.todo);
  };
  // rc-swiperの処理で使えそうなので取っておく
  // const removeTodo = useStore((state: TodosState) => {
  //   return state.removeTodo;
  // });
  // const handleRemoveTodo = () => {
  //   return removeTodo(props.todo.id);
  // };
  // const copyTodo = useStore((state) => {
  //   return state.copyTodo;
  // });
  // const handleCopyTodo = () => {
  //   copyTodo(props.todo);
  // };
  const focusRef = useRef(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.todo.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="group flex justify-between mr-5 mb-4">
        <div className="flex">
          <input
            className={clsx(
              "px-2 mr-2 w-6 h-6 rounded-full ring-0 focus:ring-gray-400",
              {
                "text-primary": props.target === "today",
                "text-secondary": props.target === "nextday",
                "text-tertiary": props.target === "otherday",
              }
            )}
            type="checkbox"
            checked={props.todo.isDone}
            onChange={handleToggleComplete}
          />
          <div>
            <button
              ref={focusRef}
              tabIndex={-1}
              onClick={handleEditTodoMobile}
              className={clsx(
                "px-6 m-0 my-auto w-full text-left dark:bg-gray-700 dark:focus:bg-transparent rounded-lg border-none focus:ring-blue-300 cursor-text line-clamp-4 lg:line-clamp-none",
                {
                  "line-through": props.todo.isDone,
                }
              )}
            >
              {props.todo.task}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
});

TodoRecordMobile.displayName = "TodoRecordMobile";
