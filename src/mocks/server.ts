import { setupServer } from "msw/node";
import { handlers } from "./list";

export const server = setupServer(...handlers);
