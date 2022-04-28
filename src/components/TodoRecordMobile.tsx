import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import type { ChangeEvent, DOMAttributes } from "react";
import { memo, useRef, useState } from "react";

import { useStore } from "../libs/store";
import type { ListTodo, Target, TodosState } from "../types";

type Props = {
  todo: ListTodo;
  target: Target;
};

export const TodoRecordMobile = memo<Props>((props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskPc, setTaskPc] = useState(props.todo.task);
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
  const setEditTodo = useStore((state) => {
    return state.setEditTodo;
  });
  const handleEditTodoPC = () => {
    setIsEditing(true);
    setEditTodo(props.todo);
  };
  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTaskPc(e.target.value);
  };
  const updateTodo = useStore((state) => {
    return state.updateTodo;
  });
  const handleOnBlur = () => {
    const postTodo: ListTodo = props.todo;
    postTodo.task = taskPc;
    updateTodo(postTodo);
    setIsEditing(false);
  };
  const handleEditTodoMobile = () => {
    setEditTodo(props.todo);
  };
  const copyTodo = useStore((state) => {
    return state.copyTodo;
  });
  const handleCopyTodo = () => {
    copyTodo(props.todo);
  };
  const focusRef = useRef(null);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.todo.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const handleSubmit: DOMAttributes<HTMLFormElement>["onSubmit"] = (e) => {
    e.preventDefault();
    setEditTodo(props.todo);
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
          {/* pc tasks*/}
          <div className="hidden lg:block">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <textarea
                  name="textarea"
                  ref={focusRef}
                  tabIndex={-1}
                  onChange={handleOnChange}
                  className={clsx(
                    "hidden lg:block m-0 my-auto w-full text-left dark:bg-gray-700 dark:focus:bg-transparent rounded-lg border-none focus:ring-blue-300 cursor-text line-clamp-4 lg:line-clamp-none",
                    {
                      "line-through": props.todo.isDone,
                    }
                  )}
                  defaultValue={taskPc}
                  onBlur={handleOnBlur}
                />
              </form>
            ) : (
              <button
                ref={focusRef}
                tabIndex={-1}
                onClick={handleEditTodoPC}
                className={clsx(
                  "hidden lg:block px-2 m-0 my-auto w-full text-left dark:bg-gray-700 dark:focus:bg-transparent rounded-lg border-none focus:ring-blue-300 cursor-text line-clamp-4 lg:line-clamp-none",
                  {
                    "line-through": props.todo.isDone,
                  }
                )}
              >
                {props.todo.task}
              </button>
            )}
          </div>
          {/* mobile tasks */}
          <div className="lg:hidden ">
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
        <div className="hidden lg:flex lg:w-1/6 opacity-10 group-hover:opacity-100">
          <button className="p-1 ml-5" onClick={handleCopyTodo}>
            <DocumentDuplicateIcon className="w-5 h-5 text-gray-500 dark:text-white" />
          </button>
          <button className="p-1 sm:mx-3" onClick={handleRemoveTodo}>
            <TrashIcon className="w-5 h-5 text-gray-500 dark:text-white" />
          </button>
        </div>
      </div>
    </li>
  );
});

TodoRecordMobile.displayName = "TodoRecordMobile";
