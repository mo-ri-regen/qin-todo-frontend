import { AuthAction, withAuthUser } from "next-firebase-auth";
import { useEffect } from "react";
import { ListTodo } from "src/components/ListTodo";
// import { ThemeChanger } from "src/components/ThemeChanger";
import { Layout } from "src/layout";
import { useStore } from "src/libs/store";

const Home = () => {
  const getTodos = useStore((state) => {
    return state.getTodos;
  });

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      {/* <ThemeChanger /> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-flow-row auto-rows-min gap-2 lg:gap-4 lg:mt-6">
        <ListTodo title="今日する" target="1" />
        <ListTodo title="明日する" target="2" />
        <ListTodo title="今度する" target="3" />
      </div>
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/signin",
})(Home);
