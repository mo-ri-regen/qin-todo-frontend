import { Popover, Transition } from "@headlessui/react";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { Fragment, useEffect } from "react";
import { ListTodo } from "src/components/ListTodo";
import { Layout } from "src/layout";
import { FooterButtons } from "src/layout/Footer/FooterButtons";
import { useStore } from "src/libs/store";

const Home = () => {
  const getTodos = useStore((state) => {
    return state.getTodos;
  });

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const AddTaskButton = () => {
    return (
      // {ListTodo.===0?null: //ここに何かを渡してない場合は「タスクを追加」を表示させる処理をさせたい
      <Popover.Button>
        <div className="flex items-center">
          <button className="px-2 mr-2 w-6 h-6 text-white bg-gray-300 rounded-full">
            +
          </button>
          <div className="text-gray-300">タスクを追加する</div>
        </div>
      </Popover.Button>
      // }
    );
  };

  return (
    <Layout>
      <Popover className="lg:min-h-screen">
        {({ open }) => {
          return (
            <>
              <div>
                <div className="mb-3 text-2xl font-semibold text-primary">
                  今日する
                </div>
                <AddTaskButton />
                <ListTodo title="今日する" target="1" />
              </div>
              <div>
                <div />
                <div className="mb-3 text-2xl font-semibold text-secondary">
                  明日する
                </div>
                <AddTaskButton />
                <ListTodo title="明日する" target="2" />
              </div>
              <div>
                <div className="mb-3 text-2xl font-semibold text-tertiary">
                  今度する
                </div>
                <AddTaskButton />
                <ListTodo title="今度する" target="3" />
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
            </>
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
