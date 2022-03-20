import clsx from "clsx";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { useEffect } from "react";
import { ListTodo } from "src/components/ListTodo";
import { ThemeChanger } from "src/components/ThemeChanger";
import { Layout } from "src/layout";
import { Footer } from "src/layout/Footer";
import { useStore } from "src/libs/store";

const Home = () => {
  const getTodos = useStore((state) => {
    return state.getTodos;
  });
  const isFooterShow = useStore((state) => {
    return state.isFooterShow;
  });

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <ThemeChanger />
      <div className="grid grid-cols-1 lg:grid-cols-3 grid-flow-row-dense lg:grid-flow-row auto-rows-min gap-4">
        <ListTodo title="今日する" target="1" />
        <ListTodo title="明日する" target="2" />
        <ListTodo title="今度する" target="3" />
      </div>
      <div
        className={clsx(
          "overflow-hidden fixed right-0 bottom-12 z-10 w-full h-2/5 bg-white dark:bg-gray-700 duration-300 ease-in-out transform",
          {
            "translate-y-full": isFooterShow,
            "translate-y-20": !isFooterShow,
          }
        )}
      >
        <Footer />
      </div>
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/signin",
})(Home);
