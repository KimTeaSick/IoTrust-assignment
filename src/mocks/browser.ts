import { setupWorker } from "msw/browser";
import { handlers, prodHandlers, stgHandlers } from "./list";

export const worker = setupWorker(...handlers, ...stgHandlers, ...prodHandlers);
