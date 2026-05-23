import { http, HttpResponse } from "msw";

export const mockMswHandlers = [
  http.get("/api/v1/health/live", () =>
    HttpResponse.json({ code: "SUCCESS_HEALTH_LIVE", message: "Service is alive." })
  ),
];
