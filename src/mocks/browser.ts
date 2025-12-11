import { setupWorker } from "msw/browser";
import { handlers } from "./list";

export const worker = setupWorker(...handlers);
