import { rest } from "msw";
import { EXAMPLE_MY_TODO_LIST } from "src/models/todo";
import type { ListTodo, PostTodo } from "src/types";

const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URI}todo/`;

export const TodosHandlers = [
  // 新しいTodoを作成する
  rest.post<PostTodo, never, ListTodo>(apiUrl, (req, res, ctx) => {
<<<<<<< HEAD
    const { task, sortKey, dueDate, completeDate, isDone } = req.body;
=======
    const { task, sortKey, dueDate, completeDate, isDone } = req.params;
>>>>>>> 1ea38a5 (mswの型定義)
    return res(
      ctx.delay(10),
      ctx.status(201),
      ctx.json({
        id: "6",
        task,
        userId: "",
        sortKey,
        dueDate,
        completeDate,
        isDone,
        createAt: "",
        updateAt: "",
      })
    );
  }),

  // 特定のTodoの情報を更新する
  rest.put<ListTodo, { todoId: string }, ListTodo>(
    `${apiUrl}:todoId`,
    (req, res, ctx) => {
      const {
        id,
        task,
        userId,
        sortKey,
        dueDate,
        completeDate,
        isDone,
        createAt,
        updateAt,
      } = req.body;
      return res(
        ctx.delay(10),
        ctx.status(200),
        ctx.json({
          id,
          task,
          userId,
          sortKey,
          dueDate,
          completeDate,
          isDone,
          createAt,
          updateAt,
        })
      );
    }
  ),

  // 特定のTodoの情報を取得する
  rest.get<never, never, ListTodo[]>(apiUrl, (req, res, ctx) => {
    return res(ctx.delay(50), ctx.status(200), ctx.json(EXAMPLE_MY_TODO_LIST));
  }),

  // 特定のTodoを削除する
  rest.delete<never, { todoId: string }, Pick<ListTodo, "id">>(
    `${apiUrl}:todoId`,
    (req, res, ctx) => {
      const { todoId } = req.params;
      return res(ctx.delay(10), ctx.status(200), ctx.json({ id: todoId }));
    }
  ),
];
