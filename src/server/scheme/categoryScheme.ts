import { z } from "zod";

export const inputCreateCategory = z.object({
  name: z.string(),
  parentId: z.string().nullable(),
  parentDepth: z.number(),
});

export type TInputCreateCategory = z.infer<typeof inputCreateCategory>;
