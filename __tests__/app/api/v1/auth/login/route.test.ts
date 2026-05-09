/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

import { AuthController } from "@/server/controllers/auth.controller";

import { POST } from "@/app/api/v1/auth/login/route";

jest.mock("@/server/controllers/auth.controller", () => ({
  AuthController: {
    login: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
  },
}));

beforeEach(() => {
  (AuthController.login as jest.Mock).mockResolvedValue(new Response("{}", { status: 200 }));
});

describe("POST /api/v1/auth/login", () => {
  it("should delegate to AuthController.login", async () => {
    const req = new NextRequest("http://localhost/api/v1/auth/login", { method: "POST" });

    const response = await POST(req);

    expect(AuthController.login).toHaveBeenCalledWith(req);
    expect(response.status).toBe(200);
  });
});
