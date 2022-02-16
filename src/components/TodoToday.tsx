/* eslint-disable react/destructuring-assignment */
import { useState } from "react";

import { useStore } from "../libs/store";
import type { Todo as TodoType, TodosState } from "../types";
// import { Footer } from "src/layout/Footer";

// eslint-disable-next-line func-style
function Todo({ title, done, index }: TodoType & { index: number }) {
  const toggleComplete = useStore((state: TodosState) => {
    return state.toggleDone;
  });
  return (
    <div className="flex items-center">
      <input
        className="mr-4 mb-4 w-6 h-6 text-primary rounded-full ring-0 focus:ring-gray-400"
        type="checkbox"
        checked={done}
        // eslint-disable-next-line react/jsx-handler-names
        onChange={() => {
          toggleComplete(index);
        }}
      />
      <div className={done ? "line-through" : ""}>{title}</div>
    </div>
  );
}

export const TodoToday = () => {
  const todos = useStore((state: TodosState) => {
    return state.todos;
  });

  const [tmpTodo, setTmpTodo] = useState<string>("");
  const add = useStore((state) => {
    return state.add;
  });
  const [error, setError] = useState(" ");
  const [isFooterShow, setIsFooterShow] = useState(false);
  const handleOnToggleFooter = () => {
    setIsFooterShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        // Prevent scrolling
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };
  const handleAddTodo = () => {
    if (tmpTodo === "") {
      setError("入力してください");
      return;
    }
    if (tmpTodo) {
      add(tmpTodo);
      setTmpTodo("");
    }
  };
  const handleOnChange = (e: any) => {
    setTmpTodo(e.target.value);
    setError("");
  };
  return (
    <>
      <div className="mb-3 text-2xl font-semibold text-primary">今日する</div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <button
            className="px-2 mr-2 w-6 h-6 text-white bg-gray-300 rounded-full"
            onClick={handleOnToggleFooter}
          >
            +
          </button>
          <div className="text-gray-300">タスクを追加する</div>
        </div>
        <div className="overflow-y-scroll my-5 max-h-36">
          <ol>
            {todos.map(({ title, done }: TodoType, index: number) => {
              return (
                <Todo
                  title={title}
                  done={done}
                  index={index}
                  key={`todo-${title}-${index}`}
                />
              );
            })}
          </ol>
        </div>
      </div>
      <div
        className={`overflow-hidden fixed w-full h-2/5 bottom-12 right-0 z-10 transform ease-in-out duration-300 ${
          isFooterShow ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* <Footer /> */}
        <>
          <div className="flex flex-col justify-center items-center h-[108px]">
            <div className="">
              <input
                className="p-2 my-3 w-80 h-9 bg-[#F1F5F9] rounded-full"
                onChange={handleOnChange}
                value={tmpTodo}
              />
            </div>
            <div className="flex items-center mb-3 text-white">
              <button
                className="px-4 mr-2 h-9 text-sm bg-primary rounded-full"
                onClick={handleAddTodo}
              >
                + 今日する
              </button>
              <button className="px-4 mr-2 h-9 text-sm bg-secondary rounded-full">
                + 明日する
              </button>
              <button className="px-4 h-9 text-sm bg-tertiary rounded-full">
                + 今度する
              </button>
            </div>
            <div className="text-sm text-gray-400"> {error}</div>
          </div>
        </>
      </div>
    </>
  );
};
