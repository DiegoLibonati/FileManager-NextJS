/**
 * @jest-environment node
 */

import { NextRequest } from "next/server";

import { UserController } from "@/server/controllers/user.controller";

import { GET as userInfoGET } from "@/app/api/v1/user/user_info/route";
import { GET as changePlanGET } from "@/app/api/v1/user/change_plan/route";
import { GET as sendEmailGET } from "@/app/api/v1/user/send_email_to_verify/route";

jest.mock("@/server/controllers/user.controller", () => ({
  UserController: {
    getUserInfo: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    changePlan: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
    sendVerificationEmail: jest.fn().mockResolvedValue(new Response("{}", { status: 200 })),
  },
}));

const req = (): NextRequest => new NextRequest("http://localhost/api/v1/user/test");

describe("User route handlers", () => {
  it("GET /user/user_info should delegate to UserController.getUserInfo", async () => {
    const request = req();
    await userInfoGET(request);

    expect(UserController.getUserInfo).toHaveBeenCalledWith(request);
  });

  it("GET /user/change_plan should delegate to UserController.changePlan", async () => {
    const request = req();
    await changePlanGET(request);

    expect(UserController.changePlan).toHaveBeenCalledWith(request);
  });

  it("GET /user/send_email_to_verify should delegate to UserController.sendVerificationEmail", async () => {
    const request = req();
    await sendEmailGET(request);

    expect(UserController.sendVerificationEmail).toHaveBeenCalledWith(request);
  });
});
