import { setupServer } from "msw/node";

import { handlers } from "../api/handler/todo";

export const server = setupServer(...handlers);
