import type { ListTodo, Todo } from "src/types";

export const EXAMPLE_MY_TODO: Todo = {
  text: `書籍を使って学ぶのは本当に必要なのか考察する。`,
  done: false,
};

export const EXAMPLE_MY_TODO_LIST: ListTodo[] = [
  {
    id: "5",
    text: `書籍を使って学ぶのは本当に必要なのか考察する。`,
    done: false,
  },
  {
    id: "4",
    text: `HTML・CSS・JavaScriptの実践。`,
    done: true,
  },
  {
    id: "3",
    text: `3年後にどうなっていたいかを考える。`,
    done: false,
  },
  {
    id: "2",
    text: `TypeScriptが何か調べてる。`,
    done: false,
  },
  {
    id: "1",
    text: `Reactのチュートリアルを学んでみた感想まとめる。`,
    done: true,
  },
];
