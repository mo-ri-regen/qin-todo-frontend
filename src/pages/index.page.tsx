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
      <div className="flex flex-col lg:flex-row">
        <ListTodo title="今日する" target="1" />
        <ListTodo title="明日する" target="2" />
        <ListTodo title="今度する" target="3" />
      </div>
      <div
        className={`overflow-hidden fixed w-full h-2/5 bottom-12 right-0 z-10 transform ease-in-out duration-300 ${
          isFooterShow ? "translate-y-0" : "translate-y-full"
        }`}
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
