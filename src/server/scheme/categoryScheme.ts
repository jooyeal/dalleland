import { z } from "zod";

export const inputCreateCategory = z.object({
  name: z.string(),
  parentId: z.string().nullable(),
  parentDepth: z.number(),
});

export const inputGetCategory = z.object({
  id: z.string().nullable(),
});

export const inputUpdateCategory = z.object({
  id: z.string(),
  parentId: z.string().nullable(),
  name: z.string(),
  comment: z.string().nullable(),
  depth: z.number(),
  isPromotion: z.boolean(),
});

export const inputDeleteCategory = z.object({
  id: z.string().nullable(),
});

export type TInputCreateCategory = z.infer<typeof inputCreateCategory>;
export type TInputGetCategory = z.infer<typeof inputGetCategory>;
export type TInputUpdateCategory = z.infer<typeof inputUpdateCategory>;
export type TInputDeleteCategory = z.infer<typeof inputDeleteCategory>;
