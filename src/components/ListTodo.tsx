import { Popover, Transition } from "@headlessui/react";
import clsx from "clsx";
import { memo } from "react";
import { Fragment } from "react";
import { FooterButtons } from "src/layout/Footer/FooterButtons";
import { useStore } from "src/libs/store";
import type { Target, TodosState } from "src/types";

import { TodoRecord } from "./TodoRecord";

type Props = {
  title: string;
  target: Target;
};

const getStringFromDate = (date: Date) => {
  const year_str: string = date.getFullYear().toString();
  //月だけ+1すること
  const month_str: string = 1 + date.getMonth().toString();
  const day_str: string = date.getDate().toString();

  let format_str = "YYYY-MM-DD";
  format_str = format_str.replace(/YYYY/g, year_str);
  format_str = format_str.replace(/MM/g, month_str);
  format_str = format_str.replace(/DD/g, day_str);
  return format_str;
};

export const ListTodo = memo<Props>((props) => {
  const allTodos = useStore((state: TodosState) => {
    return state.todos;
  });
  const date = new Date();
  const strDate = getStringFromDate(date);

  const todos = allTodos.filter((todo) => {
    switch (props.target) {
      case "3": // 「今度やる」のデータ抽出
        return todo.dueDate == "";
      case "2": // 「明日やる」のデータ抽出
        return todo.dueDate > strDate && todo.completeDate == "";
      case "1": // 「今日やる」のデータ抽出
        return (
          (todo.dueDate <= strDate && todo.dueDate != "") ||
          todo.completeDate != ""
        );
    }
  });

  return (
    <Popover className="lg:min-h-screen">
      {({ open }) => {
        return (
          <>
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
              {todos[0] ? null : (
                <Popover.Button>
                  <div className="flex lg:hidden items-center">
                    <button className="px-2 mr-2 w-6 h-6 text-white bg-gray-300 rounded-full">
                      +
                    </button>
                    <div className="text-gray-300">タスクを追加する</div>
                  </div>
                </Popover.Button>
              )}
              <div className="overflow-y-auto pt-3 w-full max-h-48 lg:max-h-full">
                <ol>
                  {todos.map((todo) => {
                    return (
                      <TodoRecord
                        todo={todo}
                        key={`todo-${todo.task}-${todo.id}`}
                        target={props.target}
                      />
                    );
                  })}
                </ol>
              </div>
              <Popover.Button>
                <div className="hidden lg:flex items-center">
                  <button className="px-2 mr-2 w-6 h-6 text-white bg-gray-300 rounded-full">
                    +
                  </button>
                  <div className="text-gray-300">タスクを追加する</div>
                </div>
              </Popover.Button>
            </div>
            <div className="relative">
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-1"
              >
                <Popover.Panel
                  static
                  className="lg:hidden fixed right-[50%] bottom-0 z-50 bg-white dark:bg-black translate-x-[50%]"
                >
                  <FooterButtons />
                </Popover.Panel>
              </Transition>
            </div>
          </>
        );
      }}
    </Popover>
  );
});

ListTodo.displayName = "ListTodo";
