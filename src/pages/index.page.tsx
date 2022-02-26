import { ThemeChanger } from "src/components/ThemeChanger";
import { ListTodoToday } from "src/components/Todo";
import { Layout } from "src/layout";

const Home = () => {
  return (
    <Layout>
      <ThemeChanger />
      <ListTodoToday
        todos={[]}
        getTempTodos={function (): void {
          throw new Error("Function not implemented.");
        }}
        addTodo={function (_text: string): void {
          throw new Error("Function not implemented.");
        }}
        removeTodo={function (_index: string): void {
          throw new Error("Function not implemented.");
        }}
        toggleDone={function (_index: string): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Layout>
  );
};

export default Home;
