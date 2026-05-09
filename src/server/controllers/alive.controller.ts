import { NextResponse } from "next/server";

export const AliveController = {
  check(): NextResponse {
    return NextResponse.json(
      { author: "Diego Libonati", name: "Nexdrive", version: "1.0.0" },
      { status: 200 }
    );
  },
};
