import { AuthAction, withAuthUser } from "next-firebase-auth";
import { ListTodo } from "src/components/ListTodo";
import { ThemeChanger } from "src/components/ThemeChanger";
import { Layout } from "src/layout";

const Home = () => {
  return (
    <Layout>
      <ThemeChanger />
      <div className="flex flex-col lg:flex-row">
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
