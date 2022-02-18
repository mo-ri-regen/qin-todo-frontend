import { TodosHandlers } from "./todos";
import { usersHandlers } from "./users";

export const handlers = [...TodosHandlers, ...usersHandlers];
