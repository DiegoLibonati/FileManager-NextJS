/**
 * @jest-environment node
 */

import { AliveController } from "@/server/controllers/alive.controller";

import { GET } from "@/app/api/v1/alive/route";

jest.mock("@/server/controllers/alive.controller", () => ({
  AliveController: {
    check: jest
      .fn()
      .mockReturnValue(new Response(JSON.stringify({ name: "test" }), { status: 200 })),
  },
}));

beforeEach(() => {
  (AliveController.check as jest.Mock).mockReturnValue(
    new Response(JSON.stringify({ name: "test" }), { status: 200 })
  );
});

describe("GET /api/v1/alive", () => {
  it("should call AliveController.check and return its response", () => {
    const response = GET();

    expect(AliveController.check).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(200);
  });
});
