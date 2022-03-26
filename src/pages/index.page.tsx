import { Popover, Transition } from "@headlessui/react";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { Fragment, useEffect } from "react";
import { ListTodo } from "src/components/ListTodo";
import { AddTaskButton } from "src/components/shared/Buttons/AddTaskButton";
import { Layout } from "src/layout";
import { FooterButtons } from "src/layout/Footer/FooterButtons";
import { getStringFromDate } from "src/libs/dateFunc";
import { useStore } from "src/libs/store";
import type { TodosState } from "src/types";

const Home = () => {
  const getTodos = useStore((state) => {
    return state.getTodos;
  });
  const allTodos = useStore((state: TodosState) => {
    return state.todos;
  });
  const date = new Date();
  const strDate = getStringFromDate(date);

  const todayTodosLen = allTodos.filter((todo) => {
    return (
      (todo.dueDate <= strDate && todo.dueDate != "") || todo.completeDate != ""
    );
  }).length;
  const nextdayTodosLen = allTodos.filter((todo) => {
    return todo.dueDate > strDate && todo.completeDate == "";
  }).length;
  const otherTodosLen = allTodos.filter((todo) => {
    return todo.dueDate == "";
  }).length;

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AddMobileTaskButton = () => {
    return (
      <Popover.Button>
        <AddTaskButton />
      </Popover.Button>
      // }
    );
  };

  return (
    <Layout>
      <Popover className="lg:min-h-screen">
        {({ open }) => {
          return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 mb-6">
              <div>
                <div className="mb-3 text-2xl font-semibold text-primary">
                  今日する
                </div>
                <div className="flex flex-col">
                  {todayTodosLen === 0 && <AddMobileTaskButton />}
                  <ListTodo title="今日する" target="1" />
                </div>
              </div>
              <div>
                <div />
                <div className="mb-3 text-2xl font-semibold text-secondary">
                  明日する
                </div>
                <div className="flex flex-col">
                  {nextdayTodosLen === 0 && <AddMobileTaskButton />}
                  <ListTodo title="明日する" target="2" />
                </div>
              </div>
              <div>
                <div className="mb-3 text-2xl font-semibold text-tertiary">
                  今度する
                </div>
                <div className="flex flex-col">
                  {otherTodosLen === 0 && <AddMobileTaskButton />}
                  <ListTodo title="今度する" target="3" />
                </div>
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
                    className="fixed right-[50%] bottom-0 z-50 bg-white dark:bg-gray-900 translate-x-[50%]"
                  >
                    <FooterButtons />
                  </Popover.Panel>
                </Transition>
              </div>
            </div>
          );
        }}
      </Popover>
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/signin",
})(Home);
