import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/user", () => {
    return HttpResponse.json({
      id: 1,
      name: "Chan9yu",
      role: "Frontend Dev",
    });
  }),

  http.post("/api/login", async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({
      success: true,
      token: "mock-token-123",
      received: body,
    });
  }),
];
