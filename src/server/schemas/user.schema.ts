import { z } from "zod";

export const changePlanQuerySchema = z.object({
  plan: z.string().min(1),
});
