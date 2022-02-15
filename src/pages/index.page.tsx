import { ThemeChanger } from "src/components/ThemeChanger";
import { TodoToday } from "src/components/TodoToday";
import { Layout } from "src/layout";

const Home = () => {
  return (
    <Layout>
      <ThemeChanger />
      <TodoToday />
    </Layout>
  );
};

export default Home;
