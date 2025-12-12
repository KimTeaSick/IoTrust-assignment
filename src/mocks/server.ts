import { setupServer } from "msw/node";
import { handlers, prodHandlers, stgHandlers } from "./list";

export const server = setupServer(...handlers, ...stgHandlers, ...prodHandlers);
