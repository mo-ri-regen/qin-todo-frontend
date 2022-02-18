import { rest } from "msw";
import { EXAMPLE_MY_TODO, EXAMPLE_MY_TODO_LIST } from "src/models/todo";

export const TodosHandlers = [
  // 新しいTodoを作成する
  rest.post("/Todos", (_req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ id: "1" }));
  }),

  // 特定のTodoの情報を取得する
  rest.get("/todos/:todoId", (req, res, ctx) => {
    const { todoId } = req.params;
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ ...EXAMPLE_MY_TODO, id: todoId })
    );
  }),

  // 特定のTodoを削除する
  rest.delete("/todos/:todoId", (req, res, ctx) => {
    const { todoId } = req.params;
    return res(ctx.delay(1000), ctx.status(200), ctx.json({ id: todoId }));
  }),

  // 自分または特定のユーザーのメモ一覧を取得する
  rest.get("/users/:userId/notes", (req, res, ctx) => {
    const { userId } = req.params;
    const notes = userId === "my" && EXAMPLE_MY_TODO_LIST;
    return res(ctx.delay(1000), ctx.status(200), ctx.json(notes));
  }),
];
