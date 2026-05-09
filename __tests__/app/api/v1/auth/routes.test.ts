/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

import { AuthController } from "@/server/controllers/auth.controller";

import { GET as logoutGET } from "@/app/api/v1/auth/logout/route";
import { POST as registerPOST } from "@/app/api/v1/auth/register/route";
import { GET as verifyGET } from "@/app/api/v1/auth/verify/route";
import { POST as resetPOST } from "@/app/api/v1/auth/reset/route";
import { POST as sendEmailPOST } from "@/app/api/v1/auth/send_email_reset/route";

jest.mock("@/server/controllers/auth.controller", () => ({
  AuthController: {
    login: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    logout: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    register: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    verify: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    resetPassword: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    sendEmailReset: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
  },
}));

const req = (): NextRequest => new NextRequest("http://localhost/api/v1/auth/test");

describe("Auth route handlers", () => {
  it("GET /auth/logout should delegate to AuthController.logout", async () => {
    await logoutGET();

    expect(AuthController.logout).toHaveBeenCalledTimes(1);
  });

  it("POST /auth/register should delegate to AuthController.register", async () => {
    const request = req();
    await registerPOST(request);

    expect(AuthController.register).toHaveBeenCalledWith(request);
  });

  it("GET /auth/verify should delegate to AuthController.verify", async () => {
    const request = req();
    await verifyGET(request);

    expect(AuthController.verify).toHaveBeenCalledWith(request);
  });

  it("POST /auth/reset should delegate to AuthController.resetPassword", async () => {
    const request = req();
    await resetPOST(request);

    expect(AuthController.resetPassword).toHaveBeenCalledWith(request);
  });

  it("POST /auth/send_email_reset should delegate to AuthController.sendEmailReset", async () => {
    const request = req();
    await sendEmailPOST(request);

    expect(AuthController.sendEmailReset).toHaveBeenCalledWith(request);
  });
});
