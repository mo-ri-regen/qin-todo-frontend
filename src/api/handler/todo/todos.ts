import { rest } from "msw";
import { EXAMPLE_MY_TODO, EXAMPLE_MY_TODO_LIST } from "src/models/todo";

const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URI}todo/`;

export const TodosHandlers = [
  // 新しいTodoを作成する
  rest.post(apiUrl, (req, res, ctx) => {
    return res(ctx.delay(10), ctx.status(201), ctx.json({ id: "6" }));
  }),

  // 特定のTodoの情報を更新する
  rest.put(apiUrl, (req, res, ctx) => {
    const { todoId } = req.params;
    return res(
      ctx.delay(10),
      ctx.status(200),
      ctx.json({ ...EXAMPLE_MY_TODO, id: todoId })
    );
  }),

  // 特定のTodoの情報を取得する
  rest.get(apiUrl, (req, res, ctx) => {
    // const { todoId } = req.params;
    return res(ctx.delay(50), ctx.status(200), ctx.json(EXAMPLE_MY_TODO_LIST));
  }),

  // 特定のTodoを削除する
  rest.delete(apiUrl, (req, res, ctx) => {
    const { todoId } = req.params;
    return res(ctx.delay(10), ctx.status(200), ctx.json({ id: todoId }));
  }),
];