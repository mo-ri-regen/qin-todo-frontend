import { ThemeChanger } from "src/components/ThemeChanger";
import { Layout } from "src/layout";

const Home = () => {
  return (
    <Layout>
      <div className="text-5xl text-blue-500">Qin Todo</div>
      <ThemeChanger />
    </Layout>
  );
};

export default Home;
