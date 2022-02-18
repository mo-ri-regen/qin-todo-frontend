import { rest } from "msw";
import { EXAMPLE_MY_TODO } from "src/models/todo";

export const TodosHandlers = [
  // 新しいTodoを作成する
  rest.post("/Todos", (_req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ id: "1" }));
  }),

  // 特定のTodoの情報を更新する
  rest.put("http://localhost:8000/todo", (req, res, ctx) => {
    const { todoId } = req.params;
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ ...EXAMPLE_MY_TODO, id: todoId })
    );
  }),

  // 特定のTodoの情報を取得する
  rest.get("http://localhost:8000/todo", (req, res, ctx) => {
    const { todoId } = req.params;
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ ...EXAMPLE_MY_TODO, id: todoId })
    );
  }),

  // 特定のTodoを削除する
  rest.delete("http://localhost:8000/todo", (req, res, ctx) => {
    const { todoId } = req.params;
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ id: todoId }));
  }),
];
