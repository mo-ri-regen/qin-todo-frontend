import { ThemeChanger } from "src/components/ThemeChanger";
import { ListTodoToday } from "src/components/Todo";
import { Layout } from "src/layout";

const Home = () => {
  return (
    <Layout>
      <ThemeChanger />
      <ListTodoToday />
    </Layout>
  );
};

export default Home;
