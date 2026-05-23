import { setupServer } from "msw/node";

import { mockMswHandlers } from "@tests/__mocks__/mswHandlers.mock";

export const mockMswServer = setupServer(...mockMswHandlers);
