import { AuthAction, withAuthUser } from "next-firebase-auth";
import { ThemeChanger } from "src/components/ThemeChanger";
import { ListTodoToday } from "src/components/Todo";
import { Layout } from "src/layout";

const Home = () => {
  return (
    <Layout>
      <ThemeChanger />
      <div className="flex flex-col lg:flex-row">
        <ListTodoToday title="今日する" target="1" />
        <ListTodoToday title="明日する" target="2" />
        <ListTodoToday title="今度する" target="3" />
      </div>
    </Layout>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/signin",
})(Home);
