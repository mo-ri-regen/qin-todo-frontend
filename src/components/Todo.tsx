// import { Footer } from "src/layout/Footer";
import clsx from "clsx";
import { memo } from "react";
import { useEffect, useState } from "react";

import { useStore } from "../libs/store";
import type { TodosState } from "../types";
import { TodoTody } from "./TodoToday";

type Props = {
  title: string;
  target: "1" | "2" | "3";
};

export const ListTodoToday = memo<Props>((props) => {
  const todos = useStore((state: TodosState) => {
    return state.todos;
  });

  const [inputTodo, setInputTodo] = useState<string>("");
  const getTempTodos = useStore((state) => {
    return state.getTempTodos;
  });
  const addTodo = useStore((state) => {
    return state.addTodo;
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
    if (inputTodo === "") {
      setError("入力してください");
      return;
    }
    if (inputTodo) {
      addTodo(inputTodo);
      setInputTodo("");
    }
  };
  const handleOnChange = (e: any) => {
    setInputTodo(e.target.value);
    setError("");
  };

  useEffect(() => {
    getTempTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="w-full lg:w-1/3">
      <div
        className={clsx("mb-3 text-2xl font-semibold", {
          "text-primary": props.target == "1",
          "text-secondary": props.target == "2",
          "text-tertiary": props.target == "3",
        })}
      >
        {props.title}
      </div>
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
        <div className="overflow-y-scroll my-5 w-full max-h-72">
          <ul>{/* ここにmockのデータを取得したい */}</ul>
          <ol>
            {todos.map((todo) => {
              return (
                <TodoTody
                  todo={todo}
                  key={`todo-${todo.text}-${todo.id}`}
                  target={props.target}
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
                value={inputTodo}
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
    </div>
  );
});

ListTodoToday.displayName = "ListTodoToday";
