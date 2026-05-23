import { NextResponse } from "next/server";

import { CODES_SUCCESS } from "@/server/constants/codes.constant";
import { MESSAGES_SUCCESS } from "@/server/constants/messages.constant";

export const AliveController = {
  check: (): NextResponse => {
    return NextResponse.json(
      {
        code: CODES_SUCCESS.alive,
        message: MESSAGES_SUCCESS.alive,
        data: { author: "Diego Libonati", name: "Nexdrive", version: "1.0.0" },
      },
      { status: 200 }
    );
  },
};
